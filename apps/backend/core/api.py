from ninja import Router, ModelSchema
import threading
from django.shortcuts import get_object_or_404
from .utils import _advance_step_after_delay
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from .models import Decision, Proposal, Vote

router = Router()

class ProposalSchemaIn(ModelSchema):
    class Meta:
        model = Proposal
        fields = ["source", "description", "decision"]

class ProposalSchemaOut(ModelSchema):
    class Meta:
        model = Proposal
        fields = ["id", "source", "description", "decision"]

@router.post(
    "proposal/",
    response=ProposalSchemaOut
)
def proposal_creation(request, payload: ProposalSchemaIn):
    data = payload.dict()
    decision = get_object_or_404(Decision, id=data.pop("decision"))
    proposal = Proposal.objects.create(decision=decision, **data)
    return proposal

@router.get(
    "proposal/{id}/",
    response=ProposalSchemaOut
)
def proposal_details(request, id: int):
    proposal = get_object_or_404(Proposal, id=id)
    return ProposalSchemaOut.from_instance(proposal)


class DecisionSchemaIn(ModelSchema):
    class Meta:
        model = Decision
        fields = ["duration", "number_of_participants", "title", "context"]


class DecisionSchemaOut(ModelSchema):
    link: str

    class Meta:
        model = Decision
        fields = ["id", "duration", "number_of_participants", "title", "context"]

    @classmethod
    def from_instance(cls, instance):
        # Helper to build the output schema with the link
        data = {
            "id": instance.id,
            "duration": instance.duration,
            "number_of_participants": instance.number_of_participants,
            "title": instance.title,
            "context": instance.context,
            "link": instance.link,
        }
        return cls(**data)

@router.post(
    "decision/",
    response=DecisionSchemaOut
)
def decision_creation(request, payload: DecisionSchemaIn):
    decision = Decision.objects.create(**payload.dict())
    return decision

@router.get(
    "decision/{id}/",
    response=DecisionSchemaOut
)
def decision_details(request, id: int):
    return get_object_or_404(Decision, id=id)


@router.post(
    "decision/{id}/next_step/",
)
def decision_next_step(request, id: int):
    instance = get_object_or_404(Decision, id=id)
    instance.current_step += 1
    instance.save()

    # If step "make proposal", launch of timer, and update step at the end of it
    if instance.current_step == 2:
        # Launch python timer for 60 seconds
        timer = threading.Timer(
            60,  # secondes
            _advance_step_after_delay,
            args=(id, 2)
        )
        timer.daemon = True
        timer.start()

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"instance_{id}",
        {
            "type": "step.update",
            "step": instance.current_step,
        }
    )

    return {"step": instance.current_step}
