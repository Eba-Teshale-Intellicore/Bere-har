from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveAPIView
from .models import Collection, GenderCollection, Product, Category
from .serializer import CollectionSerializer, GenderCollectionSerializer, ProductSerializer, CategorySerializer
from rest_framework.permissions import AllowAny

# Create your views here.

class CategoryView(ModelViewSet):
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  permission_classes = [AllowAny]

class CollectionView(ModelViewSet):
  queryset = Collection.objects.all()
  serializer_class = CollectionSerializer
  permission_classes = [AllowAny]

class GenderView(ModelViewSet):
  queryset = GenderCollection.objects.all()
  serializer_class = GenderCollectionSerializer
  permission_classes = [AllowAny]

class ProductView(ModelViewSet):
  queryset = (
    Product.objects
    .filter(is_active=True, p_status="published")
    .prefetch_related(
        "collections",
        "gender",
        "highlights",
        "variants",
    )
    .select_related(
        "category",
        "brand",
    )
)
  serializer_class = ProductSerializer
  permission_classes = [AllowAny]
  lookup_field = "p_slug"


