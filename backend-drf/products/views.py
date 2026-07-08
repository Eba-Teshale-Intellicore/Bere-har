from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Product
from .serializer import ProductSerializer
from rest_framework.permissions import AllowAny

# Create your views here.
class ProductView(ModelViewSet):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  permission_classes = [AllowAny]