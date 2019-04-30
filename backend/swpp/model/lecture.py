from django.db import models

class Lecture(models.Model):
    prof = models.TextField(default = '')
    title = models.TextField(default = '')
