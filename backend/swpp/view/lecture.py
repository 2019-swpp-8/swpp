from django.shortcuts import render
from swpp.models import Lecture
from swpp.serializers import LectureSerializer
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

class LectureFilterBackend(DjangoFilterBackend):
    def filter_queryset(self, request, queryset, view):
        req_title = request.GET['title'] if ('title' in request.GET) else ''
        req_prof = request.GET['prof'] if ('prof' in request.GET) else ''
        return queryset.filter(title__icontains=req_title,
                               prof__icontains=req_prof)

class LectureList(generics.ListAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer
    filter_backends = (LectureFilterBackend,)
    filterset_fields = ('title', 'prof')

