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
        req_name = request.GET['name'] if ('name' in request.GET) else ''

        if('lecTitle' in request.GET):
            if(request.GET['lecTitle'] != ''):
                queryset = queryset.filter(lectures__title__icontains=request.GET['lecTitle'])
        if('lecProf' in request.GET):
            if(request.GET['lecProf'] != ''):
                queryset = queryset.filter(lectures__prof__icontains=request.GET['lecProf'])
        queryset = queryset.distinct()

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
            
        queryset = queryset.filter(bio__icontains=req_bio, exp__icontains=req_exp, profile__major__icontains=req_major, profile__name__icontains=req_name)
        queryset = queryset.distinct()
        queryset = queryset.order_by('profile__name')    
        
        return queryset

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
