from django.shortcuts import render
from swpp.models import Lecture
from swpp.serializers import LectureSerializer
from rest_framework import generics

class LectureList(generics.ListAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer

class LectureDetails(generics.RetrieveAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
