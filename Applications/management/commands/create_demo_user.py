from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "Create a demo user for the Job Application Tracker"

    def handle(self, *args, **kwargs):

        username = "demo"
        password = "demo@123"

        user, created = User.objects.get_or_create(
            username=username
        )

        user.set_password(password)
        user.save()

        if created:
            self.stdout.write(
                self.style.SUCCESS(
                    "Demo user created successfully!"
                )
            )
        else:
            self.stdout.write(
                self.style.SUCCESS(
                    "Demo user already existed. Password has been reset."
                )
            )