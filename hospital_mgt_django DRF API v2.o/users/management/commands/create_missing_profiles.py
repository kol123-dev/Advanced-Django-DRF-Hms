from django.core.management.base import BaseCommand
from users.models import User
from users.models import UserProfile
from django.db import transaction

class Command(BaseCommand):
    help = 'Creates missing UserProfile for users without one'

    def handle(self, *args, **options):
        users_without_profile = User.objects.filter(profile=None)
        count = users_without_profile.count()

        if count == 0:
            self.stdout.write(self.style.SUCCESS("✅ All users already have profiles."))
            return

        self.stdout.write(f"ℹ️ Found {count} users without profile. Creating...")

        created_count = 0
        for user in users_without_profile:
            try:
                with transaction.atomic():
                    UserProfile.objects.create(user=user)
                    created_count += 1
                    self.stdout.write(self.style.SUCCESS(f"✅ Created profile for {user.email}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"❌ Failed to create profile for {user.email}: {e}"))

        self.stdout.write(self.style.SUCCESS(f"✔ Successfully created {created_count} missing profiles."))