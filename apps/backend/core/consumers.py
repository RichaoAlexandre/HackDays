import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async
from django_redis import get_redis_connection

class DecisionStepConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.instance_id = self.scope["url_route"]["kwargs"]["instance_id"]
        self.group_name = f"instance_{self.instance_id}"
        self.redis_key = f"{self.group_name}_count"

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


        redis_conn = get_redis_connection("default")
        await sync_to_async(redis_conn.incr)(self.redis_key)
        total = int(await sync_to_async(redis_conn.get)(self.redis_key) or 0)
        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "connexion.number",
                "count": total,
            }
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

        redis_conn = get_redis_connection("default")
        new_val = await sync_to_async(redis_conn.decr)(self.redis_key)
        if new_val <= 0:
            await sync_to_async(redis_conn.delete)(self.redis_key)
            total = 0
        else:
            total = new_val

        await self.channel_layer.group_send(
            self.group_name,
            {
                "type": "connexion.number",
                "count": total,
            }
        )

    async def receive(self, text_data=None, bytes_data=None):
        pass


    async def connexion_number(self, event):
        count = event["count"]
        await self.send(text_data=json.dumps({
            "type": "connexion.number",
            "count": count,
        }))


    async def step_update(self, event):
        step = event["step"]
        await self.send(text_data=json.dumps({
            "type": "step.update",
            "step": step,
        }))

    
    @database_sync_to_async
    def _get_instance(self, instance_id):
        from .models import Decision
        
        try:
            instance = Decision.objects.get(pk=instance_id)
        except Decision.DoesNotExist:
            return None
        return instance