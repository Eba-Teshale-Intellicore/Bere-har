from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Profile
from django.contrib.auth.models import User
from .serializer import UserSerializer, ProfileSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated


class RegisterView(CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

class ProfileView(ModelViewSet):
  queryset = Profile.objects.all()
  serializer_class = ProfileSerializer
  permission_classes = [IsAuthenticated]

# customer API
  # def get_queryset(self):
  #   return Profile.objects.filter(
  #       user=self.request.user
  #   )