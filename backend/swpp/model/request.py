from django.db import models
from annoying.fields import AutoOneToOneField
from swpp.model.tutor import Tutor
from swpp.model.profile import Profile
from swpp.model.lecture import Lecture
from swpp.model.times import Times

class Request(models.Model):
    tutor = models.ForeignKey(Tutor, related_name = 'requests', on_delete=models.CASCADE, null = False)
    tutee = models.ForeignKey(Profile, related_name = 'requests', on_delete=models.CASCADE, null = False)
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE, null = False)
    detail = models.TextField(default = '')
    payment = models.TextField(default = '')
    times = AutoOneToOneField(Times, on_delete=models.CASCADE, null = False)
