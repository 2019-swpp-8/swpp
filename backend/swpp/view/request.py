from django.shortcuts import render
from swpp.models import Request
from swpp.serializers import RequestSerializer
from rest_framework import generics

class RequestList(generics.ListAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

class RequestDetails(generics.RetrieveAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
