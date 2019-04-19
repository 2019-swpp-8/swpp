from django.db import models
from annoying.fields import AutoOneToOneField
from swpp.model.user import User

class Profile(models.Model):
    user = AutoOneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    joined = models.DateTimeField(auto_now_add = True)
