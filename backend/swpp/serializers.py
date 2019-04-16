from rest_framework import serializers
from swpp.models import User, Profile, Tutor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'profile')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user', 'joined', 'tutor')

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = ('profile', 'bio')
