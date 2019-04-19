from django.shortcuts import render
from swpp.models import Tutor
from swpp.serializers import TutorSerializer
from rest_framework import generics

class TutorList(generics.ListAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

class TutorDetails(generics.RetrieveAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer
