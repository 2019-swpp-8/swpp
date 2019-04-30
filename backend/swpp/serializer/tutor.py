from rest_framework import serializers
from swpp.models import Tutor
from swpp.serializer.request import RequestSerializer
from swpp.serializer.times import TimesSerializer

class TutorSerializer(serializers.ModelSerializer):
    requests = RequestSerializer(many = True, read_only = True)

    class Meta:
        model = Tutor
        fields = ('profile', 'bio', 'exp', 'lectures', 'times', 'requests') # requests
