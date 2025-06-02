from ninja import Router, ModelSchema
from .models import DecisionToMake
from django.shortcuts import get_object_or_404

router = Router()

FRONTEND_URL = "localhost:5173" # to move somewhere else


class DecisionSchemaIn(ModelSchema):
    class Meta:
        model = DecisionToMake
        fields = ["duration", "number_of_participants", "title", "context"]


class DecisionSchemaOut(ModelSchema):
    link: str

    class Meta:
        model = DecisionToMake
        fields = ["id", "duration", "number_of_participants", "title", "context"]


@router.post(
    "decision/",
    response=DecisionSchemaOut
)
def decision_creation(request, payload: DecisionSchemaIn):
    decision = DecisionToMake.objects.create(**payload.dict())
    return decision

@router.get(
    "decision/{id}/",
    response=DecisionSchemaOut
)
def decision_details(request, id: int):
    return get_object_or_404(DecisionToMake, id=id)