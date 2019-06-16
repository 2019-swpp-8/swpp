from django.db import models
from swpp.model.profile import Profile

class Notification(models.Model):
    message = models.TextField(default = '')
    profile = models.ForeignKey(Profile, related_name = 'notifications', on_delete=models.CASCADE, null = False)
    read = models.BooleanField(default = False)
