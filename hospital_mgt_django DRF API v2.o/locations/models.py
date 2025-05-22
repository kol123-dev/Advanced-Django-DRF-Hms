from django.db import models

class Location(models.Model):
    name = models.CharField(max_length=100)
    location_type = models.CharField(max_length=50, choices=[
        ('OPD', 'Outpatient Department'),
        ('IPD', 'Inpatient Department'),
        ('ER', 'Emergency Room'),
        ('Pharmacy', 'Pharmacy'),
        ('Radiology', 'Radiology Unit'),
        ('Laboratory', 'Lab Unit'),
        ('Other', 'Other')
    ])

    def __str__(self):
        return f"{self.name} ({self.location_type})"