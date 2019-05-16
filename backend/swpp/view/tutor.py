from django.shortcuts import render
from swpp.models import Tutor
from swpp.serializers import TutorSerializer
from swpp.permissions import IsOwnerOrReadOnly
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

class TutorFilterBackend(DjangoFilterBackend):
    def filter_queryset(self, request, queryset, view):
        req_bio = request.GET['bio'] if ('bio' in request.GET) else '';
        req_exp = request.GET['exp'] if ('exp' in request.GET) else '';
        return queryset.filter(bio__icontains=req_bio, exp__icontains=req_exp)

class TutorList(generics.ListAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer
    filter_backends = (TutorFilterBackend,)
    filterset_fields = ('bio', 'exp')

class TutorDetails(generics.RetrieveUpdateAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
