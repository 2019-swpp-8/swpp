from rest_framework import serializers
from swpp.models import Request
#from swpp.serializer.tutor import TutorReadSerializer

class RequestWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ('id', 'tutor', 'tutee', 'lecture', 'detail', 'payment', 'times', 'status')

class RequestReadSerializer(serializers.ModelSerializer):
    #tutor = TutorReadSerializer(read_only = True)

    class Meta:
        model = Request
        fields = ('id', 'tutor', 'tutee', 'lecture', 'detail', 'payment', 'times', 'status')
        depth = 2
