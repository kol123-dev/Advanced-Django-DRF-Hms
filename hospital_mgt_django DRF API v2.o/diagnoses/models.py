from django.db import models

class Diagnosis(models.Model):
    condition = models.CharField(max_length=255)
    code = models.CharField(max_length=50, blank=True, null=True)  # e.g., ICD-10 code
    description = models.TextField()

    def __str__(self):
        return self.condition