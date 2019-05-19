from django.shortcuts import render
from swpp.models import Times
from swpp.serializers import TimesSerializer
from rest_framework import generics, mixins

class TimesList(generics.ListAPIView):
    queryset = Times.objects.all()
    serializer_class = TimesSerializer

class TimesDetails(generics.RetrieveAPIView,
                   mixins.UpdateModelMixin):
    queryset = Times.objects.all()
    serializer_class = TimesSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
