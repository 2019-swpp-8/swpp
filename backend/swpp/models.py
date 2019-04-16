from django.db import models
from django.contrib.auth import get_user_model
from annoying.fields import AutoOneToOneField

User = get_user_model()

class Profile(models.Model):
    user = AutoOneToOneField(User, primary_key=True, on_delete=models.CASCADE);
    joined = models.DateTimeField(auto_now_add = True)
