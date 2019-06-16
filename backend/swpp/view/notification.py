from django.shortcuts import render
from swpp.models import Notification
from swpp.serializers import NotificationSerializer
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

class NotificationDetails(generics.RetrieveDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
