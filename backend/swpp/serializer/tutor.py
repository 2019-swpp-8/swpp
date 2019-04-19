from rest_framework import serializers
from swpp.models import Tutor

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = ('profile', 'bio')
