from rest_framework import serializers
from swpp.models import Tutor
from swpp.serializer.request import RequestSerializer
from swpp.serializer.times import TimesSerializer
from swpp.serializer.profile import ProfileSerializer

class TutorSerializer(serializers.ModelSerializer):
    requests = RequestSerializer(many = True, read_only = True)
    profile = ProfileSerializer(read_only = True)

    class Meta:
        model = Tutor
        fields = ('profile', 'bio', 'exp', 'lectures', 'times', 'tutoringTimes', 'requests')
        read_only_fields = ('tutoringTimes')

    def validate(self, data):
        times = data.get(times)
        tutoringTimes = data.get(tutoringTimes)
        for day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']:
            if times[day] & tutoringTimes[day]:
                raise serializers.ValidationError("튜터링 중인 시간을 가능하다고 표시했습니다.")

        return data
        
class TutorRecursiveSerializer(serializers.ModelSerializer):
    requests = RequestSerializer(many = True, read_only = True)
    profile = ProfileSerializer(read_only = True)

    class Meta:
        model = Tutor
        fields = ('profile', 'bio', 'exp', 'lectures', 'times', 'tutoringTimes', 'requests')
        read_only_fields = ('tutoringTimes')
        depth = 1
