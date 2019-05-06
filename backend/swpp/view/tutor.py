from django.shortcuts import render
from swpp.models import Tutor
from swpp.serializers import TutorSerializer
from swpp.permissions import IsOwnerOrReadOnly
from rest_framework import generics

class TutorList(generics.ListAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

class TutorDetails(generics.RetrieveUpdateAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Tutor.objects.all()
    serializer_class = TutorSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
