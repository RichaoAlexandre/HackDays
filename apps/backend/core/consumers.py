import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Decision
from channels.db import database_sync_to_async

class DecisionStepConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.instance_id = self.scope["url_route"]["kwargs"]["instance_id"]
        self.group_name = f"instance_{self.instance_id}"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

        # If first connection, we send the actual step to user
        instance = await self._get_instance(self.instance_id)
        if instance:
            data = {
                "type": "step.update",
                "step": instance.current_step,
            }
            # Envoyer au client
            await self.send(text_data=json.dumps(data))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        pass

    async def step_update(self, event):
        step = event["step"]
        await self.send(text_data=json.dumps({
            "type": "step.update",
            "step": step,
        }))

    
    @database_sync_to_async
    def _get_instance(self, instance_id):
        try:
            instance = Decision.objects.get(pk=instance_id)
        except Decision.DoesNotExist:
            return None
        return instance