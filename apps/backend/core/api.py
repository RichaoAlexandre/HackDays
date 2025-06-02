from ninja import Router, ModelSchema
from .models import Decision
from django.shortcuts import get_object_or_404

router = Router()


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