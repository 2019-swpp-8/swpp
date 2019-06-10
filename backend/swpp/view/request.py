from django.shortcuts import render
from swpp.models import Request
from swpp.serializers import RequestSerializer
from rest_framework import generics
from swpp.model.times import Times

class RequestList(generics.ListCreateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def post(self, request, *args, **kwargs):
        t = Times()
        t.mon = request.data['mon']
        t.tue = request.data['tue']
        t.wed = request.data['wed']
        t.thu = request.data['thu']
        t.fri = request.data['fri']
        t.sat = request.data['sat']
        t.sun = request.data['sun']
        t.save()
        request.data._mutable = True
        request.data.update({'times': t.pk})
        request.data._mutable = False
        return self.create(request, *args, **kwargs)

class RequestDetails(generics.RetrieveDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer
