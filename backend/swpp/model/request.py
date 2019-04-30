from django.db import models
from annoying.fields import AutoOneToOneField
from swpp.model.tutor import Tutor
from swpp.model.profile import Profile
from swpp.model.lecture import Lecture
from swpp.model.times import Times

class Request(models.Model):
    tutor = models.ForeignKey(Tutor, related_name = 'requests', on_delete=models.CASCADE)
    tutee = models.ForeignKey(Profile, related_name = 'requests', on_delete=models.CASCADE)
    lecture = models.ForeignKey(Lecture, on_delete=models.CASCADE)
    detail = models.TextField()
    payment = models.TextField()
    times = AutoOneToOneField(Times, on_delete=models.CASCADE)
