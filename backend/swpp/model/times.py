from django.db import models
from annoying.fields import AutoOneToOneField

class Times(models.Model):
    mon = models.BigIntegerField()
    tue = models.BigIntegerField()
    wed = models.BigIntegerField()
    thu = models.BigIntegerField()
    fri = models.BigIntegerField()
    sat = models.BigIntegerField()
    sun = models.BigIntegerField()
