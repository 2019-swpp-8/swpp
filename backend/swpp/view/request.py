from django.shortcuts import render
from swpp.models import Request
from swpp.serializers import RequestWriteSerializer, RequestReadSerializer
from rest_framework import generics
from swpp.model.times import Times
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import status
from rest_framework.response import Response

class RequestFilterBackend(DjangoFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if 'tutor' in request.GET and request.GET['tutor'] != '':
            queryset = queryset.filter(tutor=request.GET['tutor'])
        if 'tutee' in request.GET and request.GET['tutee'] != '':
            queryset = queryset.filter(tutee=request.GET['tutee'])
        return queryset

class RequestList(generics.ListCreateAPIView):
    queryset = Request.objects.all()
    filter_backends = (RequestFilterBackend,)
    filterset_fields = ('tutor', 'tutee')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RequestReadSerializer
        return RequestWriteSerializer

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
        if hasattr(request.data, '_mutable'):
            request.data._mutable = True
        request.data.update({'times': t.pk})
        if hasattr(request.data, '_mutable'):
            request.data._mutable = False
        return self.create(request, *args, **kwargs)

class RequestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestWriteSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
