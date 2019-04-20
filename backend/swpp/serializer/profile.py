from rest_framework import serializers
from swpp.models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'joined', 'tutor')
