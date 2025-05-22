from django.db import models

class Drug(models.Model):
    name = models.CharField(max_length=100)
    generic_name = models.CharField(max_length=100)
    strength = models.CharField(max_length=50)
    form = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.generic_name} ({self.strength}, {self.form})"