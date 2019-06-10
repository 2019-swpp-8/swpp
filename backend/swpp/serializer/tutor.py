from rest_framework import serializers
from swpp.models import Tutor
from swpp.serializer.request import RequestWriteSerializer
from swpp.serializer.times import TimesSerializer
from swpp.serializer.profile import ProfileSerializer

class TutorWriteSerializer(serializers.ModelSerializer):
    requests = RequestWriteSerializer(many = True, read_only = True)
    profile = ProfileSerializer(read_only = True)

    class Meta:
        model = Tutor
        fields = ('profile', 'bio', 'exp', 'lectures', 'times', 'requests')

class TutorReadSerializer(serializers.ModelSerializer):
    requests = RequestWriteSerializer(many = True, read_only = True)
    profile = ProfileSerializer(read_only = True)

    class Meta:
        model = Tutor
        fields = ('profile', 'bio', 'exp', 'lectures', 'times', 'requests')
        depth = 1
