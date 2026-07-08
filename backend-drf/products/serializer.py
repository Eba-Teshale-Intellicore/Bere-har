from rest_framework import serializers
from .models import (
    Category,
    Collection,
    Product,
    ProductImage,
    ProductVariant,
)

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = "__all__"
    

class CollectionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Collection
    fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductImage
    fields = "__all__"


class ProductVariantSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductVariant
    fields = "__all__"



class ProductSerializer(serializers.ModelSerializer):
  images = ProductImageSerializer(many=True, read_only=True)
  variants = ProductVariantSerializer(many= True, read_only= True)
  class Meta:
    model = Product
    fields = "__all__"
