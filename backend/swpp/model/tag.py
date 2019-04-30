from django.db import models

class Tag(models.Model):
    name = models.TextField(primary_key = True)
