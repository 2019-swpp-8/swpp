from django.db import models

class Lecture(models.Model):
    prof = models.TextField()
    title = models.TextField()
