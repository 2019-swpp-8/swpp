from django.db import models
from annoying.fields import AutoOneToOneField
from swpp.model.user import User
from swpp.model.tag import Tag

class Profile(models.Model):
    user = AutoOneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    joined = models.DateTimeField(auto_now_add = True)
    major = models.TextField()
    contact = models.TextField()
    tags = models.ManyToManyField(Tag)
