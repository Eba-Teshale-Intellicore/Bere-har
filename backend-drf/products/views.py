from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Product, Category
from .serializer import ProductSerializer, CategorySerializer
from rest_framework.permissions import AllowAny

# Create your views here.
class ProductView(ModelViewSet):
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  permission_classes = [AllowAny]

class CategoryView(ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  permission_classes = [AllowAny]