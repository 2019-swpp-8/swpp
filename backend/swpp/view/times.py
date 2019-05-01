from django.shortcuts import render
from swpp.models import Times
from swpp.serializers import TimesSerializer
from rest_framework import generics

class TimesList(generics.ListAPIView):
    queryset = Times.objects.all()
    serializer_class = TimesSerializer

class TimesDetails(generics.RetrieveAPIView):
    queryset = Times.objects.all()
    serializer_class = TimesSerializer
