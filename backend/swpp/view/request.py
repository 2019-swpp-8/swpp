from django.shortcuts import render
from swpp.models import *
from swpp.serializers import RequestWriteSerializer, RequestReadSerializer, TimesSerializer, NotificationSerializer
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

days = ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')

def postMessage(tutee, lecture_id):
    lecture = Lecture.objects.get(pk = lecture_id)
    return f'{tutee} 님이 {lecture.prof} 교수의 {lecture.title} 과목 튜터링을 신청했습니다.'

def acceptMessage(tutor, lecture_id):
    lecture = Lecture.objects.get(pk = lecture_id)
    return f'{tutor} 님에게 신청한 {lecture.prof} 교수의 {lecture.title} 과목 튜터링이 수락되었습니다.'

def completeMessage(lecture_id):
    lecture = Lecture.objects.get(pk = lecture_id)
    return f'{lecture.prof} 교수의 {lecture.title} 과목 튜터링이 종료되었습니다.'

def deleteMessage(tutor, lecture_id):
    lecture = Lecture.objects.get(pk = lecture_id)
    return f'{tutor} 님에게 신청한 {lecture.prof} 교수의 {lecture.title} 과목 튜터링이 거절되었습니다.'

def flipTime(tutor, request_times):
    times = tutor.times
    times.flip(request_times)
    times.save()
    tutoringTimes = tutor.tutoringTimes
    tutoringTimes.flip(request_times)
    tutoringTimes.save()

class RequestList(generics.ListCreateAPIView):
    queryset = Request.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return RequestReadSerializer
        return RequestWriteSerializer

    def post(self, request, *args, **kwargs):
        serializer = TimesSerializer(data = { key:request.data.get(key) for key in days })
        valid = serializer.is_valid()
        if valid:
            times = serializer.save()
            if hasattr(request.data, '_mutable'):
                request.data._mutable = True
            request.data.update({'times': times.id})
            tutor = Tutor.objects.get(pk = request.data.get('tutor'))
            message = postMessage(request.user.profile.name, request.data.get('lecture'))
            serializer = NotificationSerializer(data = {'profile': tutor,
                                                        'message': message})
            if serializer.is_valid(): serializer.save()
        request_ = self.create(request, *args, **kwargs)
        if valid: flipTime(tutor, times)
        return request_

class RequestDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestWriteSerializer

    def put(self, request, *args, **kwargs):
        response = self.partial_update(request, *args, **kwargs)
        status = request.data.get('status', 0)
        if response.status_code < 300 and status: # upon status update
            request_ = Request.objects.get(pk = kwargs['pk'])
            if status == '1':
                message = acceptMessage(Profile.objects.get(pk = request.user).name, request_.lecture.id)
            else:
                profile = Profile.objects.get(tutor = request_.tutor)
                message = completeMessage(request_.lecture.id)
                serializer = NotificationSerializer(data = {'profile': profile,
                                                             'message': message})
                if serializer.is_valid(): serializer.save()
                flipTime(request_.tutor, request_.times)
            serializer = NotificationSerializer(data = {'profile': request_.tutee,
                                                        'message': message})
            if serializer.is_valid(): serializer.save()
        return response

    def delete(self, request, *args, **kwargs):
        request_ = Request.objects.get(pk = kwargs['pk'])
        message = deleteMessage(Profile.objects.get(pk = request.user).name, request_.lecture.id)
        serializer = NotificationSerializer(data = {'profile': request_.tutee,
                                                    'message': message})
        if serializer.is_valid(): serializer.save()
        flipTime(request_.tutor, request_.times)
        return self.destroy(request, *args, **kwargs)
