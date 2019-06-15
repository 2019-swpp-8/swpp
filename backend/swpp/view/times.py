from django.shortcuts import render
from swpp.models import Times, Tutor
from swpp.serializers import TimesSerializer
from rest_framework import generics, mixins
from rest_framework.response import Response

class TimesList(generics.ListAPIView):
    queryset = Times.objects.all()
    serializer_class = TimesSerializer

class TimesDetails(generics.RetrieveUpdateAPIView):
    queryset = Times.objects.all()
    serializer_class = TimesSerializer

    def put(self, request, *args, **kwargs):
        times = Times.objects.get(pk = kwargs['pk'])
        context = {}
        if 'tutor' in request.POST:
            context['tutoringTimes'] = Tutor.objects.get(pk = request.POST.get('tutor')).tutoringTimes
        serializer = TimesSerializer(times, data=request.data, context=context)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
        # return self.update(request, *args, **kwargs)
