from ninja import Router, ModelSchema, Schema
from .models import DecisionToMake
from django.shortcuts import get_object_or_404
from typing import List, Dict
import json
from openai import OpenAI
import os
from dotenv import load_dotenv
load_dotenv()


from .models import Decision

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
    return get_object_or_404(DecisionToMake, id=id)

MODEL_NAME = "albert-small"  
client = OpenAI(
    base_url = 'https://albert.api.etalab.gouv.fr/v1',
    api_key=os.getenv("ALBERT_API_KEY"),
)

class ShortenChoicesSchema(Schema):
    question: str
    choices: List[str]

@router.post("/shorten_choices", response=Dict)
def shorten_choices(request, payload: ShortenChoicesSchema):
    """
    Shortens a list of choices by grouping similar options using an AI model.

    Args:
        request: The incoming request object.
        question: The question related to the choices.
        choices: A list of strings representing the choices.

    Returns:
        A dictionary containing the shortened list of choices in the format:
        {"short_choices": [<shortened list>]}
    """

    input_data = payload
    prompt = """You are an ai assistant to prepare a vote between multiple choices. You will be given a list of choices.
        Some choices might be identical or of same meaning, or one choice might englobe another.
        You have to shorten the list by grouping similar choices into one relevant and most precise choice. In the following example, sushis is more precise than japanese so we keep sushis.
        Be really concise, your answer MUST only consist in the json {"short_choices": [<your short list>]}.
        Example : 
        INPUT: {"question": "Where do you want to eat?", "choices":["italian", "sushis", "japanese", "mcdonald", "american fastfood"]}
        OUTPUT: {"short_choices": ["italian", "sushis", "mcdonald"]}
        Here is the INPUT:
    """
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "user", "content": prompt + str(input_data)},
        ]
    )
    answer = json.loads(response.choices[0].message.content)
    return answer
