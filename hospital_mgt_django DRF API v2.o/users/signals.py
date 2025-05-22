from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, UserProfile

print("✅ Signals loaded")

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    print("Signal triggered for user:", instance.email)
    if created:
        print("Creating profile...")
        UserProfile.objects.create(user=instance)