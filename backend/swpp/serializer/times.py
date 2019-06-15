from rest_framework import serializers
from swpp.models import Times

days = ('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')

class TimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Times
        fields = ('id',) + days

    def validate(self, data):
        for day in days:
            time = data.get(day)
            if time >= (1 << 48) or time < 0:
                raise serializers.ValidationError('시간 값이 범위를 벗어났습니다.')

        if 'tutoringTimes' in self.context:
            tutoringTimes = self.context['tutoringTimes']
            for day in days:
                if data.get(day) & getattr(tutoringTimes, day):
                    raise serializers.ValidationError("튜터링 중인 시간을 가능하다고 표시했습니다.")

        return data
