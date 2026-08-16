from django.db import models
from django.contrib.auth.models import User


class Application(models.Model):

    STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Interviewing', 'Interviewing'),
        ('Rejected', 'Rejected'),
    ]

    company = models.CharField(max_length=100)

    role = models.CharField(max_length=100)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='Applied'
    )

    date_applied = models.DateField()

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.company} - {self.role}"