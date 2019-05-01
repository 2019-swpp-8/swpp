from django.shortcuts import render
from swpp.models import Tag
from swpp.serializers import TagSerializer
from rest_framework import generics

class TagList(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TagDetails(generics.RetrieveAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
