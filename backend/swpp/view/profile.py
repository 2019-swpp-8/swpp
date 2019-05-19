from django.shortcuts import render
from swpp.models import Profile
from swpp.serializers import ProfileSerializer
from rest_framework import generics, mixins, permissions
from swpp.permissions import IsOwnerOrReadOnly

class ProfileList(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class ProfileDetails(generics.RetrieveAPIView,
        mixins.UpdateModelMixin):
    
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = (IsOwnerOrReadOnly, )

    def put(self, request, *args, **kwargs):
        ProfileSerializer.validate(self, request.data)
        return self.partial_update(request, *args, **kwargs)
