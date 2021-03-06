from rest_framework import serializers
from swpp.models import Profile, Request
from swpp.serializer.request import RequestReadSerializer
from swpp.serializer.notification import NotificationSerializer

import re

def hasTutoring(user, req_user):
    if hasattr(req_user, 'profile'):
        profile = user.profile
        req_profile = req_user.profile
        queryset = Request.objects.filter(status = 1)
        return (queryset.filter(tutor = profile.tutor, tutee = req_profile) or
               queryset.filter(tutor = req_profile.tutor, tutee = profile))
    return False

class PrivateField(serializers.Field):
    def get_attribute(self, obj):
        return obj
    def to_representation(self, obj):
        req_user = self.context['request'].user
        if obj.user == req_user: return obj.contact
        return obj.contact if hasTutoring(obj.user, req_user) else ""
    def to_internal_value(self, data):
        return data

class ProfileSerializer(serializers.ModelSerializer):
    requests = RequestReadSerializer(many = True, read_only = True)
    notifications = NotificationSerializer(many = True, read_only = True)

    class Meta:
        model = Profile
        fields = ('user', 'name', 'joined', 'major', 'contact', 'tutor', 'requests', 'notifications')

    contact = PrivateField()

    def validate(self, data):
        phone = re.compile('01\d-\d{3,4}-\d{4}')
        if data.get('contact') and re.fullmatch(phone, data.get('contact')) == None:
            raise serializers.ValidationError("연락처가 010-1234-5678 형태로 입력되지 않았습니다.")

        return data
