from django.shortcuts import render

# Create your views here.
from .models import StoreLocations
from .serializer import LocationSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny


class LocationView(ModelViewSet):
  queryset = StoreLocations.objects.filter(is_active= True)
  serializer_class = LocationSerializer
  permission_classes = [AllowAny]