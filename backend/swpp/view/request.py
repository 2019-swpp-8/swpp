from django.shortcuts import render
from swpp.models import Request
from swpp.serializers import RequestSerializer, TimesSerializer
from rest_framework import generics

class RequestList(generics.ListCreateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def post(self, request, *args, **kwargs):
        serializer = TimesSerializer(data = { key:request.POST.get(key) for key
                                             in ('mon', 'tue', 'wed',
                                             'thu', 'fri', 'sat', 'sun') })
        if serializer.is_valid(): times = serializer.save()
        else: raise ValueError
        request.data.update({'times': times.id})
        return self.create(request, *args, **kwargs)

class RequestDetails(generics.RetrieveDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
