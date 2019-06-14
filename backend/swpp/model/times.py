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

    # other is Times
    def flip(self, other):
        self.mon ^= other.mon
        self.tue ^= other.tue
        self.wed ^= other.wed
        self.thu ^= other.thu
        self.fri ^= other.fri
        self.sat ^= other.sat
        self.sun ^= other.sun

    # other is TimesSerializer
    # minInterval, total: 1 per 30 min. ex) 4 = 2 hrs
    def isAvailable(self, other, minInterval, total):
        mon = self.mon & other.data['mon']
        tue = self.tue & other.data['tue']
        wed = self.wed & other.data['wed']
        thu = self.thu & other.data['thu']
        fri = self.fri & other.data['fri']
        sat = self.sat & other.data['sat']
        sun = self.sun & other.data['sun']

        available = 0

        for time in (mon, tue, wed, thu, fri, sat, sun):
            combo = 0
            while time:
                if time & 1: combo += 1
                else:
                    if combo >= minInterval: available += combo
                    combo = 0
                time >>= 1
            if combo >= minInterval: available += combo

        return available >= total
