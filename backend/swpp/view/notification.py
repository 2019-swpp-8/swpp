from django.shortcuts import render
from django.http import Http404
from swpp.models import Notification
from swpp.serializers import NotificationSerializer
from rest_framework import generics
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

class NotificationDetails(generics.RetrieveDestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get(self, request, *args, **kwargs):
        try:
            notification = Notification.objects.get(pk = kwargs['pk'])
        except Notification.DoesNotExist: raise Http404
        notification.read = True
        notification.save()
        return Response(NotificationSerializer(notification).data)
