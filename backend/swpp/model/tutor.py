from django.db import models
from annoying.fields import AutoOneToOneField
from swpp.model.profile import Profile
from swpp.model.lecture import Lecture
from swpp.model.times import Times

def default_times():
    t = Times()
    t.save()
    return t.pk

class Tutor(models.Model):
    profile = AutoOneToOneField(Profile, primary_key=True, on_delete=models.CASCADE, null = False)
    bio = models.TextField(default = '')
    exp = models.TextField(default = '')
    lectures = models.ManyToManyField(Lecture)
    times = AutoOneToOneField(Times, on_delete=models.CASCADE, null = False, default = default_times)
