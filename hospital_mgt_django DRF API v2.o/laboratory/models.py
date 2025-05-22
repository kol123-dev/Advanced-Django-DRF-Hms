from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model

User = get_user_model()


class LabTestCategory(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class LabTestType(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(LabTestCategory, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.category or 'Uncategorized'}: {self.name}"


class LabResultAttachment(models.Model):
    lab_order = models.ForeignKey(
        'visits.LabTestOrder',  # 👈 Safe string reference
        on_delete=models.CASCADE,
        related_name='attachments'
    )
    file = models.FileField(upload_to='lab_results/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True
    )

    def __str__(self):
        return f"Attachment for {self.lab_order}"