import os
import json
from typing import List, Dict
from pydantic import BaseModel as Schema
from openai import OpenAI
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.conf import settings

MODEL_NAME = "albert-small"
client = OpenAI(
    base_url=settings.ALBERT_BASE_URL,
    api_key=settings.ALBERT_API_KEY,
)

class ShortenChoicesSchema(Schema):
    question: str
    choices: List[str]

def _shorten_choices(question: str, choices: List[str]) -> Dict:
    """
    Shortens a list of choices by grouping similar options using an AI model.
    Args:
        question: The question related to the choices.
        choices: A list of strings representing the choices.
    Returns:
        A dictionary containing the shortened list of choices in the format:
        {"short_choices": [<shortened list>]}
    """
    input_data = ShortenChoicesSchema(question=question, choices=choices).dict()
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
            {"role": "user", "content": prompt + json.dumps(input_data)},  # Use json.dumps
        ]
    )
    try:
        answer = json.loads(response.choices[0].message.content)
    except (json.JSONDecodeError, IndexError) as e:
        print(f"Error decoding JSON or accessing response: {e}")
        return {"short_choices": choices}  # Return original choices in case of error
    return answer


def _advance_step_after_delay(instance_id: int, expected_step: int):
    # Function to update current_step after delay, and send back the info to users
    from core.models import Decision, Proposal

    try:
        instance = Decision.objects.get(pk=instance_id)
    except Decision.DoesNotExist:
        return

    if instance.current_step != expected_step:
        return

    instance.current_step += 1
    instance.save()

    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"instance_{instance_id}",
        {
            "type": "step.update",
            "step": instance.current_step,
        }
    )

   # Call to ALBERT and update proposals
    choices = list(Proposal.objects.filter(decision=instance).values_list("description", flat=True))
    if choices:
        question = instance.title
        shortened_choices_data = _shorten_choices(question, choices)
        shortened_choices = shortened_choices_data.get("short_choices", choices)

        instance.proposals.all().delete()
        for choice in shortened_choices:
            Proposal.objects.create(decision=instance, description=choice)
    instance.current_step += 1
    instance.save()
