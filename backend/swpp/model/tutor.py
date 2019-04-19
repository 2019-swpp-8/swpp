from django.db import models
from annoying.fields import AutoOneToOneField
from swpp.model.profile import Profile

class Tutor(models.Model):
    profile = AutoOneToOneField(Profile, primary_key=True, on_delete=models.CASCADE)
    bio = models.TextField()
