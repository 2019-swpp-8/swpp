from django.db import models
from annoying.fields import AutoOneToOneField
from swpp.model.profile import Profile
from swpp.model.lecture import Lecture
from swpp.model.times import Times

class Tutor(models.Model):
    profile = AutoOneToOneField(Profile, primary_key=True, on_delete=models.CASCADE)
    bio = models.TextField()
    exp = models.TextField()
    lectures = models.ManyToManyField(Lecture)
    times = AutoOneToOneField(Times, on_delete=models.CASCADE)
