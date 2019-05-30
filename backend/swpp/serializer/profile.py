from rest_framework import serializers
from swpp.models import Profile
from swpp.serializer.request import RequestSerializer
import re

'''
from rest_framework_serializer_field_permissions import fields
from rest_framework_serializer_field_permissions.serializers import FieldPermissionSerializerMixin
from rest_framework_serializer_field_permissions.permissions import BaseFieldPermission
'''

class PrivateField(serializers.Field):
    def get_attribute(self, obj):
        return obj
    def to_representation(self, obj):
        if obj.user != self.context['request'].user:
            return ""
        else:
            return obj.contact
    def to_internal_value(self, data):
        return data

class ProfileSerializer(serializers.ModelSerializer):
    requests = RequestSerializer(many = True, read_only = True)

    class Meta:
        model = Profile
        fields = ('user', 'name', 'joined', 'major', 'contact', 'tags', 'tutor', 'requests') # requests?
        '''
        class IsOwner(BaseFieldPermission):
        def has_permission(self, request):
        return request.user == data.get('user')


contact = fields.CharField(permission_classes=(IsOwner(), ))
    '''

    contact = PrivateField()


    def validate(self, data):
        phone = re.compile('01\d-\d{3,4}-\d{4}')
        if data.get('contact') and re.fullmatch(phone, data.get('contact')) == None:
            raise serializers.ValidationError("연락처가 010-1234-5678 형태로 입력되지 않았습니다.")

        return data
