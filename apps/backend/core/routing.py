from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(
        r"ws/decision/(?P<instance_id>\w+)/current_step/$",
        consumers.DecisionStepConsumer.as_asgi(),
    ),
    re_path(
        r"ws/decision/(?P<instance_id>\w+)/votes/$",
        consumers.VoteConsumer.as_asgi(),
    ),
]