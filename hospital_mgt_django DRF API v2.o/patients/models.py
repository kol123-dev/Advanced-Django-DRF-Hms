from django.db import models
from django.conf import settings
from django.utils import timezone
from dateutil.relativedelta import relativedelta

User = settings.AUTH_USER_MODEL

def generate_mrn():
    last_patient = Patient.objects.order_by("id").last()
    if not last_patient:
        return "MRN100001"  # Starting point if no patient exists yet
    
    last_id = last_patient.id
    new_id = last_id + 1
    return f"MRN{new_id:06d}"


class Patient(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    ]

    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
    ]
    PAYMENT_MODE_CHOICES = [
        ('cash', 'Cash'),
        ('insurance', 'Insurance'),
    ]

    created_by = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name='created_patients'
    )
    mrn = models.CharField(
        max_length=50,
        unique=True,
        verbose_name="Medical Record Number",
        default=generate_mrn
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    blood_group = models.CharField(max_length=3, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    emergency_contact_name = models.CharField(max_length=100, blank=True, null=True)
    emergency_contact_phone = models.CharField(max_length=20, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    mode_of_payment = models.CharField(
        max_length=10,
        choices=PAYMENT_MODE_CHOICES,
        default='cash'
    )
    insurance = models.CharField(max_length=100, blank=True, null=True)
    discharged_time = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    
    from django.utils import timezone

    @property
    def age(self):
        if not self.date_of_birth:
            return None
        today = timezone.now().date()
        dob = self.date_of_birth
        return max(0, relativedelta(today, dob).years)
    


class ChronicCondition(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='chronic_conditions')
    condition = models.CharField(max_length=100)
    diagnosed_date = models.DateField()
    active = models.BooleanField(default=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.patient} - {self.condition}"


class Medication(models.Model):
    """
    Medication prescribed for a specific chronic condition
    """
    chronic_condition = models.ForeignKey(ChronicCondition, on_delete=models.CASCADE, related_name='medications')
    name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.chronic_condition.condition}"


class Allergy(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='allergies')
    allergen = models.CharField(max_length=100)
    severity = models.CharField(max_length=50)
    reaction = models.TextField()

    def __str__(self):
        return f"{self.patient} - {self.allergen}"


class SurgicalHistory(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='surgical_history')
    procedure = models.CharField(max_length=100)
    date_performed = models.DateField()
    hospital = models.CharField(max_length=100, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.patient} - {self.procedure}"


class FamilyHistory(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='family_history')
    relative = models.CharField(max_length=50)
    condition = models.CharField(max_length=100)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.patient} - {self.relative}: {self.condition}"