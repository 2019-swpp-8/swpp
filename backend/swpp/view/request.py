from django.shortcuts import render
from swpp.models import Request, Times, Tutor
from swpp.serializers import RequestWriteSerializer, RequestReadSerializer
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

days = ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')

'''
class RequestFilterBackend(DjangoFilterBackend):
    def filter_queryset(self, request, queryset, view):
        if 'tutor' in request.GET and request.GET['tutor']:
            queryset = queryset.filter(tutor=request.GET['tutor'])
        if 'tutee' in request.GET and request.GET['tutee']:
            queryset = queryset.filter(tutee=request.GET['tutee'])
        return queryset
'''

class RequestList(generics.ListCreateAPIView):
    queryset = Request.objects.all()
    '''
    filter_backends = (RequestFilterBackend,)
    filterset_fields = ('tutor', 'tutee')
    '''

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RequestReadSerializer
        return RequestWriteSerializer

    def post(self, request, *args, **kwargs):
        serializer = TimesSerializer(data = { key:request.POST.get(key) for key in days })
        if serializer.is_valid(): times = serializer.save()
        else: return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        request.data.update({'times': times.id})
        return self.create(request, *args, **kwargs)

class RequestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestWriteSerializer

    def put(self, request, *args, **kwargs):
        response = self.partial_update(request, *args, **kwargs)
        if response.status_code < 300 and request.PUT.get('status', 0): # upon status update
            request_ = Request.objects.get(pk = request.PUT.get('pk'))
            request_.tutor.times.flip(request_.times)
            request_.tutor.tutoringTimes.flip(request_.times)
        return response
