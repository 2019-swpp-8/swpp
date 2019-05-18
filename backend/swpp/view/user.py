from django.shortcuts import render
from swpp.models import User
from swpp.serializers import UserSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.exceptions import PermissionDenied

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetails(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCurrent(APIView):
    def get(self, request, format=None):
        if request.user.is_authenticated:
            return Response(UserSerializer(request.user).data)
        else:
            raise PermissionDenied('Not logged in!')
