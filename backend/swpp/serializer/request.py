from rest_framework import serializers
from swpp.models import Request, Times, Tutor
#from swpp.serializer.tutor import TutorReadSerializer

class RequestWriteSerializer(serializers.ModelSerializer):
    def validate(self, data):
        tutor_times = Tutor.objects.get(pk = data['tutor']).times
        request_times = Times.objects.get(pk = data['times'])
        for day in ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'):
            tutor_day = getattr(tutor_times, day)
            if tutor_day != tutor_day | getattr(request_times, day):
                raise serializers.ValidationError('튜터링이 가능한 시간이 아닙니다.')
        return data

    class Meta:
        model = Request
        fields = ('id', 'tutor', 'tutee', 'lecture', 'detail', 'payment', 'times', 'status')

class RequestReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ('id', 'tutor', 'tutee', 'lecture', 'detail', 'payment', 'times', 'status')
        depth = 2
