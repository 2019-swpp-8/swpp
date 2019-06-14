from rest_framework import serializers
from swpp.models import Tutor
from swpp.serializer.request import RequestWriteSerializer
from swpp.serializer.times import TimesSerializer
from swpp.serializer.profile import ProfileSerializer

class TutorWriteSerializer(serializers.ModelSerializer):
    requests = RequestWriteSerializer(many = True, read_only = True)
    profile = ProfileSerializer(read_only = True)

    class Meta:
        model = Tutor
        fields = ('profile', 'bio', 'exp', 'lectures', 'times', 'tutoringTimes', 'requests')
        read_only_fields = ('tutoringTimes',)

'''
    def validate(self, data):
        print(data)
        if 'times' in data:
            times = data.get('times')
            for day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']:
                if times[day] & self.tutoringTimes[day]:
                    raise serializers.ValidationError("튜터링 중인 시간을 가능하다고 표시했습니다.")

        return data
'''

class TutorRecursiveSerializer(serializers.ModelSerializer):
    requests = RequestWriteSerializer(many = True, read_only = True)
    profile = ProfileSerializer(read_only = True)

    class Meta:
        model = Tutor
        fields = ('profile', 'bio', 'exp', 'lectures', 'times', 'tutoringTimes', 'requests')
        depth = 1
