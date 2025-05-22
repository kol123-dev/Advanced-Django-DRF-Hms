from django.db import models
from django.conf import settings
from django.utils import timezone
from patients.models import Patient
from users.models import User
from laboratory.models import LabTestType

PRIORITY_CHOICES = (
    ('routine', 'Routine'),
    ('urgent', 'Urgent'),
    ('stat', 'Stat (Immediate)'),
)

STATUS_CHOICES = (
    ('pending', 'Pending'),
    ('in_progress', 'In Progress'),
    ('completed', 'Completed'),
    ('cancelled', 'Cancelled'),
)

# -----------------------------
# VISIT & ENCOUNTER MODELS
# -----------------------------

class Visit(models.Model):
    """
    Represents a single patient encounter (OPD, IPD, Emergency, etc.)
    """
    VISIT_TYPES = (
        ('OPD', 'Outpatient Department'),
        ('IPD', 'Inpatient Department'),
        ('ER', 'Emergency Room'),
        ('ANC', 'Antenatal Care'),
        ('PNC', 'Postnatal Care'),
        ('VCT', 'Voluntary Counseling and Testing'),
        ('OTHER', 'Other')
    )

    STATUS_CHOICES = (
        ('scheduled', 'Scheduled'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('admitted', 'Admitted (for IPD)'),
        ('referred', 'Referred to Specialist'),
        ('discharged', 'Discharged'),
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='visits')
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(null=True, blank=True)
    visit_type = models.CharField(max_length=50, choices=VISIT_TYPES, default='OPD')
    location = models.ForeignKey('locations.Location', on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    reason_for_visit = models.TextField(blank=True, null=True)
    referring_doctor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='referrals')
    visit_notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.patient} - {self.visit_type} ({self.start_time.strftime('%Y-%m-%d')})"


class Encounter(models.Model):
    """
    A single interaction between a provider and a patient during a visit.
    E.g., doctor's assessment, nurse triage, etc.
    """
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='encounters')
    provider = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='encounters')
    chief_complaint = models.TextField()
    history_of_present_illness = models.TextField(blank=True, null=True)
    physical_examination = models.TextField(blank=True, null=True)
    diagnosis = models.ForeignKey('diagnoses.Diagnosis', on_delete=models.SET_NULL, null=True, blank=True)
    findings_summary = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Encounter by {self.provider} | {self.visit}"


# -----------------------------
# CLINICAL DATA MODELS
# -----------------------------

class VitalSigns(models.Model):
    """
    Vitals collected during a visit or encounter
    """
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='vitals')
    systolic_bp = models.PositiveSmallIntegerField(null=True, blank=True)
    diastolic_bp = models.PositiveSmallIntegerField(null=True, blank=True)
    temperature = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)  # °C
    heart_rate = models.PositiveSmallIntegerField(null=True, blank=True)  # bpm
    respiratory_rate = models.PositiveSmallIntegerField(null=True, blank=True)  # breaths per minute
    oxygen_saturation = models.PositiveSmallIntegerField(null=True, blank=True)  # SpO2 %
    weight = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)  # kg
    height = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)  # cm
    bmi = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    recorded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    recorded_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        if self.height and self.weight and self.height > 0 and self.weight > 0:
            height_meters = float(self.height) / 100
            weight_kg = float(self.weight)
            self.bmi = round(weight_kg / (height_meters ** 2), 2)
        else:
            self.bmi = None  # Or set to 0 depending on use case
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.visit} - Vitals ({self.recorded_at})"


class Diagnosis(models.Model):
    """
    Clinical diagnosis made during a visit/encounter
    """
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='diagnoses')
    encounter = models.ForeignKey(Encounter, on_delete=models.SET_NULL, null=True, related_name='diagnoses')
    condition = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True, null=True)  # ICD-10 code
    is_primary = models.BooleanField(default=False)
    notes = models.TextField(blank=True, null=True)
    diagnosed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    diagnosed_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.condition} - {self.visit}"


class Prescription(models.Model):
    """
    Medications prescribed during a visit
    """
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='prescriptions')
    encounter = models.ForeignKey(Encounter, on_delete=models.SET_NULL, null=True, related_name='prescriptions')
    diagnosis = models.ForeignKey(Diagnosis, on_delete=models.SET_NULL, null=True, related_name='prescriptions')
    drug = models.ForeignKey('pharmacy.Drug', on_delete=models.SET_NULL, null=True)
    dosage = models.CharField(max_length=100)
    frequency = models.CharField(max_length=100)
    duration_days = models.PositiveIntegerField(default=7)
    quantity = models.PositiveIntegerField(default=1)
    instructions = models.TextField(blank=True, null=True)
    prescribed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    prescribed_at = models.DateTimeField(default=timezone.now)
    is_dispensed = models.BooleanField(default=False)
    dispensed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.drug} - {self.visit}"



class LabTestOrder(models.Model):
    

    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='lab_orders')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='lab_orders')

    test_type = models.ForeignKey(LabTestType, on_delete=models.SET_NULL, null=True)
    requested_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='requested_lab_tests')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='routine')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    ordered_at = models.DateTimeField(default=timezone.now)
    estimated_completion_time = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    result = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.test_type} - {self.patient}"

    @property
    def test_name(self):
        return self.test_type.name

    @property
    def category(self):
        # Assuming you'll later categorize LabTestType
        return self.test_type.category if hasattr(self.test_type, 'category') else 'Uncategorized'


class RadiologyOrder(models.Model):
    """
    Radiology orders like X-ray, Ultrasound, CT scan
    """
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='radiology_orders')
    radiology_type = models.ForeignKey('radiology.RadiologyType', on_delete=models.SET_NULL, null=True)
    ordered_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    ordered_at = models.DateTimeField(default=timezone.now)
    result_description = models.TextField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.radiology_type} - {self.visit}"


class Procedure(models.Model):
    """
    Procedures performed during a visit
    """
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='procedures')
    name = models.CharField(max_length=100)
    description = models.TextField()
    performed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    performed_at = models.DateTimeField(default=timezone.now)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.visit}"


class Referral(models.Model):
    """
    Internal or external referral made during a visit
    """
    REASON_CHOICES = (
        ('specialist', 'Specialist Consultation'),
        ('second_opinion', 'Second Opinion'),
        ('investigations', 'Advanced Investigations'),
        ('treatment', 'Treatment Elsewhere'),
    )

    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='referrals')
    from_provider = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='referrals_given')
    to_location = models.ForeignKey('locations.Location', on_delete=models.SET_NULL, null=True)
    reason = models.CharField(max_length=50, choices=REASON_CHOICES)
    notes = models.TextField(blank=True, null=True)
    referred_at = models.DateTimeField(default=timezone.now)
    follow_up_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"Referred to: {self.to_location} | {self.visit}"


class FollowUp(models.Model):
    """
    Follow-up appointments scheduled after a visit
    """
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='followups')
    scheduled_for = models.DateTimeField()
    reason = models.TextField()
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Follow-up for {self.visit.patient} | Scheduled: {self.scheduled_for}"


class Note(models.Model):
    """
    General notes added by staff during visit
    """
    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='notes')
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.visit}"


# -----------------------------
# SUPPORTING MODELS (Optional)
# -----------------------------
# These can go into their own apps later (e.g., pharmacy, lab, radiology)
# But we define them here temporarily

class Drug(models.Model):
    """
    Simple model for medication (can be moved to pharmacy app later)
    """
    GENERIC_NAME_CHOICES = (
        ('Paracetamol', 'Paracetamol'),
        ('Amoxicillin', 'Amoxicillin'),
        ('Metformin', 'Metformin'),
        ('Labetalol', 'Labetalol'),
        ('Others', 'Others')
    )

    generic_name = models.CharField(max_length=100, choices=GENERIC_NAME_CHOICES)
    brand_name = models.CharField(max_length=100, blank=True, null=True)
    strength = models.CharField(max_length=50)  # e.g., "500mg"
    form = models.CharField(max_length=50)  # e.g., Tablet, Injection, Syrup

    def __str__(self):
        return f"{self.generic_name} ({self.strength}, {self.form})"