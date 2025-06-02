from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


def _advance_step_after_delay(instance_id: int, expected_step: int):
    # Function to update current_step after delay, and send back the info to users
    from core.models import Decision

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