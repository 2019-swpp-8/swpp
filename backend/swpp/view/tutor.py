from django.shortcuts import render
from swpp.models import Tutor
from swpp.serializers import TutorWriteSerializer, TutorReadSerializer, TimesSerializer
from swpp.permissions import IsOwnerOrReadOnly
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

class TutorFilterBackend(DjangoFilterBackend):
    def filter_queryset(self, request, queryset, view):
        req_bio = request.GET['bio'] if ('bio' in request.GET) else ''
        req_exp = request.GET['exp'] if ('exp' in request.GET) else ''
        req_major = request.GET['major'] if ('major' in request.GET) else ''
        if 'total' in request.GET:
            times = TimesSerializer(data = { key:request.GET[key] for key
                                             in ('mon', 'tue', 'wed',
                                             'thu', 'fri', 'sat', 'sun') })
            total = int(request.GET['total'])
            if times.is_valid() and total > 0:
                minInterval = int(request.GET['minInterval']) if 'minInterval' in request.GET else 1
                pks = [q.pk for q in queryset if q.times.isAvailable(times, minInterval, total)]
                queryset = queryset.filter(pk__in=pks)
        if 'lecture' in request.GET:
            lecture = request.GET['lecture']
            queryset = queryset.filter(lectures__id=lecture)
        return queryset.filter(bio__icontains=req_bio, exp__icontains=req_exp, profile__major__icontains=req_major)

class TutorList(generics.ListAPIView):
    queryset = Tutor.objects.all()
    serializer_class = TutorReadSerializer
    filter_backends = (TutorFilterBackend,)

class TutorDetails(generics.RetrieveUpdateAPIView):
    permission_classes = (IsOwnerOrReadOnly,)
    queryset = Tutor.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return TutorReadSerializer
        return TutorWriteSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
