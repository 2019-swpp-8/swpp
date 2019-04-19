from django.shortcuts import render
from swpp.models import Profile
from swpp.serializers import ProfileSerializer
from rest_framework import generics

class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetails(generics.RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
