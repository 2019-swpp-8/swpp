from django.db import models
from annoying.fields import AutoOneToOneField

class Times(models.Model):
    mon = models.BigIntegerField(default = 0)
    tue = models.BigIntegerField(default = 0)
    wed = models.BigIntegerField(default = 0)
    thu = models.BigIntegerField(default = 0)
    fri = models.BigIntegerField(default = 0)
    sat = models.BigIntegerField(default = 0)
    sun = models.BigIntegerField(default = 0)
