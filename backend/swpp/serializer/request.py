from rest_framework import serializers
from swpp.models import Request, Times

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ('id', 'tutor', 'tutee', 'lecture', 'detail', 'payment', 'times', 'status')

    def validate(self, data):
        # FIXME
        return data
