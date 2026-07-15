from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Profile
from django.contrib.auth.models import User
from .serializer import UserSerializer, ProfileSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import RetrieveUpdateAPIView


class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

class ProfileView(RetrieveUpdateAPIView):

    serializer_class = ProfileSerializer
    permission_classes = [
        IsAuthenticated
    ]

    def get_object(self):
        return self.request.user.profile

# customer API
  