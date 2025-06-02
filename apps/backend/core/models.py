from django.db import models
from django.conf import settings


FRONTEND_URL = "localhost:3000" # to move somewhere else


class DecisionToMake(models.Model):
    duration: int = models.IntegerField(verbose_name="Duration in seconds")
    number_of_participants: int = models.IntegerField(verbose_name="Number of participants")
    title: str = models.CharField(verbose_name="Title of the decision")
    context: str = models.TextField(verbose_name="Additionnal context")

    @property
    def link(self):
        return f"{settings.FRONTEND_URL}/{self.id}"