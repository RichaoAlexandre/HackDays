from ninja import NinjaAPI
from core.api import router

api = NinjaAPI()

api.add_router("", router)