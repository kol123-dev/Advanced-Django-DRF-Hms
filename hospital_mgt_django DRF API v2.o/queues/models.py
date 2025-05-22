# queues/models.py
from django.db import models
from visits.models import Visit
from users.models import User
from django.utils import timezone

class Que(models.Model):
    DEPARTMENT_CHOICES = [
        ('Triage', 'Triage'),
        ('Internal Medicine', 'Internal Medicine'),
        ('General Surgery', 'General Surgery'),
        ('Cardiology', 'Cardiology'),
        ('Gynecology', 'Gynecology'),
        ('Orthopedics', 'Orthopedics'),
        ('Pediatrics', 'Pediatrics'),
        ('Pharmacy', 'Pharmacy'),
        ('Emergency', 'Emergency'),
        ('Ophthalmology', 'Ophthalmology'),
        ('Dental', 'Dental'),
        ('Radiology', 'Radiology'),
        ('Laboratory', 'Laboratory'),
    ]

    PRIORITY_CHOICES = [
        ('Normal', 'Normal'),
        ('Urgent', 'Urgent'),
        ('Emergency', 'Emergency')
    ]

    STATUS_CHOICES = [
        ('Waiting', 'Waiting'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
        ('Transferred', 'Transferred'),
        ('Scheduled', 'Scheduled'),
        ('Cancelled', 'Cancelled'),
        ('No Show', 'No Show'),
    ]

    visit = models.ForeignKey(Visit, on_delete=models.CASCADE, related_name='queue_entries')
    department = models.CharField(max_length=50, choices=DEPARTMENT_CHOICES)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Normal')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Waiting')
    
    arrival_time = models.DateTimeField(default=timezone.now)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.visit.patient} - {self.department} ({self.status})"