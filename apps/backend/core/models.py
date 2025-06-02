from django.db import models
from django.conf import settings


class Proposal(models.Model):
    description = models.TextField(verbose_name="Proposal Description")
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
    STEP_CHOICES = [
      (1, "Step 1"), #Waiting
      (2, "Step 2"), # Make proposal
      (3, "Step 3"), # Clustering
      (4, "Step 4"),  # Vote and comment
      (5, "Step 5"), # Show result
    ]

    # To track status of instance
    current_step = models.IntegerField(choices=STEP_CHOICES, default=1)

    def __str__(self):
        return self.title


    @property
    def link(self):
        return f"{settings.FRONTEND_URL}/decision/{self.id}"
