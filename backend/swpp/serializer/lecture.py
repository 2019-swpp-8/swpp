from rest_framework import serializers
from swpp.models import Lecture

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ('id', 'prof', 'title')

    def validate(self, data):
        if data.get('prof') == '':
            raise serializers.ValidationError("교수가 입력되지 않았습니다.")

        if data.get('titla') == '':
            raise serializers.ValidationError("강좌명이 입력되지 않았습니다.")

        return data
