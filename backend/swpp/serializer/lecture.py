from rest_framework import serializers
from swpp.models import Lecture

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ('id', 'prof', 'title')
