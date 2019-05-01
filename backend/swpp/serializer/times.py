from rest_framework import serializers
from swpp.models import Times

class TimesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Times
        fields = ('id', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun')

    def validate(self, data):
        for day in ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']:
            time = data.get(day)
            if time >= (1 << 48) or time < 0:
                raise serializers.ValidationError('시간 값이 범위를 벗어났습니다.')

        return data
