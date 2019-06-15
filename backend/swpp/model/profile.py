from django.db import models
from annoying.fields import AutoOneToOneField
from swpp.model.user import User

class Profile(models.Model):
    user = AutoOneToOneField(User, primary_key=True, on_delete=models.CASCADE, null = False)
    name = models.TextField(default = '')
    joined = models.DateTimeField(auto_now_add = True)
    major = models.TextField(default = '')
    contact = models.TextField(default = '010-0000-0000')
