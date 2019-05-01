from rest_framework import serializers
from swpp.models import Profile
from swpp.serializer.request import RequestSerializer
import re

class ProfileSerializer(serializers.ModelSerializer):
    requests = RequestSerializer(many = True, read_only = True)

    class Meta:
        model = Profile
        fields = ('user', 'joined', 'major', 'contact', 'tags', 'tutor', 'requests') # requests?

    def validate(self, data):
        if data.get('major') == '':
            raise serializers.ValidationError("전공이 입력되지 않았습니다.")

        phone = re.compile('01\d-\d{3,4}-\d{4}')
        if re.fullmatch(phone, data.get('contact')) == None:
            raise serializers.ValidationError("연락처가 010-1234-5678 형태로 입력되지 않았습니다.")

        return data
