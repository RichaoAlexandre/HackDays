from django.db import models
from django.conf import settings


class User(models.Model):
    name = models.CharField(verbose_name="Name of the user", max_length=100)
    is_organizer = models.BooleanField(default=False, verbose_name="Is organizer")

    def __str__(self):
        return self.name


class Proposal(models.Model):
    description = models.TextField(verbose_name="Proposal Description")
    creator = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name='proposals'
    )
    decision = models.ForeignKey(
        'Decision',
        on_delete=models.CASCADE,
        related_name='proposals'
    )

    def __str__(self):
        return f"Proposal {self.id} by {self.creator.name}"


class Vote(models.Model):
    PRO = "PR"
    CON = "CO"
    TYPE_CHOICES = [
        (PRO, "pro"),
        (CON, "con"),
    ]

    type = models.CharField(
        max_length=2,
        choices=TYPE_CHOICES,
        default=PRO,
        verbose_name="Vote Type"
    )
    comment = models.TextField(verbose_name="Comment", blank=True)
    user = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name="votes"
    )
    proposal = models.ForeignKey(
        'Proposal',
        on_delete=models.CASCADE,
        related_name="votes"
    )

    def __str__(self):
        return f"{self.get_type_display()} by {self.user.name}"


class Decision(models.Model):
    duration = models.IntegerField(verbose_name="Duration in seconds")
    number_of_participants = models.IntegerField(verbose_name="Number of participants")
    title = models.CharField(max_length=255, verbose_name="Title of the decision")
    context = models.TextField(verbose_name="Additional context")
    organizer = models.ForeignKey(
        'User',
        on_delete=models.CASCADE,
        related_name="decisions"
    )

    def __str__(self):
        return self.title

    @property
    def link(self):
        return f"{settings.FRONTEND_URL}/decision/{self.id}"
