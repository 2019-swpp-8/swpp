from rest_framework import serializers
from swpp.models import Request

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ('id', 'tutor', 'tutee', 'lecture', 'detail', 'payment', 'times')

    def validate(self, data):
        if data.get('payment') == '':
            raise serializers.ValidationError("보수를 입력해야 합니다.")

        return data
