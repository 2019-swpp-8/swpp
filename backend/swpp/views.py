from django.shortcuts import render
from swpp.models import User, Profile, Tutor
from swpp.serializers import UserSerializer, ProfileSerializer, TutorSerializer
from rest_framework import generics

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetails(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetails(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class TutorList(generics.ListAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

class TutorDetails(generics.RetrieveAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer
