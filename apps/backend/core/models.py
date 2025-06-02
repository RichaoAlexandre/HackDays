from django.db import models
from django.conf import settings


class User(models.Model):
    id: int = models.AutoField(primary_key=True, verbose_name="User ID")
    name: str = models.CharField(verbose_name="Name of the user", max_length=100)
    is_organizer: bool = models.BooleanField(default=False, verbose_name="Is organizer")

class Vote(models.Model):
    PRO = "PR"
    CON = "CO"
    TYPE_CHOICES = {
       PRO: "pro",
       CON: "con"
    }
    type: str = models.CharField(
        max_length=2,
        choices=TYPE_CHOICES,
        default=PRO
    )
    comment: str = models.TextField(verbose_name="Comment", blank=True, null=True)
    user: User = models.ForeignKey(User, on_delete=models.CASCADE, related_name="votes")


class Proposal(models.Model):
    description: str
    creator: User
    votes: Vote = models.ManyToManyField(
        Vote,
        related_name="proposals",
        blank=True
    )
    creator: User = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="proposals"
    )

class Decision(models.Model):
    duration: int = models.IntegerField(verbose_name="Duration in seconds")
    number_of_participants: int = models.IntegerField(verbose_name="Number of participants")
    title: str = models.CharField(verbose_name="Title of the decision")
    context: str = models.TextField(verbose_name="Additionnal context")
    organizer: User = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="decisions"
    )
    proposals: Proposal = models.ManyToManyField(
        Proposal,
        related_name="decisions",
        blank=True
    )

    @property
    def link(self):
        return f"{settings.FRONTEND_URL}/decision/{self.id}"
