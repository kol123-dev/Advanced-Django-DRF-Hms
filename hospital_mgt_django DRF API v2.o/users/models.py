# users/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    ROLES = (
        ('Receptionist', 'Receptionist'),
        ('Nurse', 'Nurse'),
        ('Doctor', 'Doctor'),
        ('Hospital Admin', 'Hospital Admin'),
        ('Pharmacist', 'Pharmacist'),
        ('Laboratory Technician', 'Laboratory Technician'),
        ('Radiology Technician', 'Radiology Technician'),
        ('Accountant', 'Accountant'),
        ('Maintenance Staff', 'Maintenance Staff'),
        ('Other', 'Other'),  # Placeholder for other roles

        # Add other roles here
    )
    
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=40, choices=ROLES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    objects = CustomUserManager()
  
    def __str__(self):
        return self.email
    
class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    
    # Personal Info
    title = models.CharField(max_length=10, blank=True, null=True)  # e.g., Dr., Prof.
    full_name = models.CharField(max_length=100, blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    nationality = models.CharField(max_length=100, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    tel = models.CharField(max_length=20, blank=True, null=True)

    # Professional Info
    specialty = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=100, blank=True, null=True)
    license_number = models.CharField(max_length=100, blank=True, null=True)
    join_date = models.DateField(auto_now_add=True)
    bio = models.TextField(blank=True, null=True)

    # Emergency Contact
    emergency_contact_name = models.CharField(max_length=100, blank=True, null=True)
    emergency_contact_relationship = models.CharField(max_length=50, blank=True, null=True)
    emergency_contact_phone = models.CharField(max_length=20, blank=True, null=True)
    emergency_contact_tel = models.CharField(max_length=20, blank=True, null=True)
    emergency_contact_email = models.EmailField(blank=True, null=True)

    # Qualifications
    education = models.TextField(blank=True, null=True)
    certifications = models.TextField(blank=True, null=True)

    # Profile Picture
    profile_photo = models.ImageField(upload_to='profile_pics/', blank=True, null=True)

    def __str__(self):
        return f"Profile of {self.user.email}"