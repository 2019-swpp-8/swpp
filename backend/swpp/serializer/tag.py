from rest_framework import serializers
from swpp.models import Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('name')

    def validate(self, data):
        if data.get('name') == '':
            raise serializers.ValidationError("분야가 입력되지 않았습니다.")

        return data
