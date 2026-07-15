from rest_framework import serializers
from .models import (
   Brand,
   Category,
   Collection,
   GenderCollection,
   Product,
   ProductHighlight,
   ProductVariant,
   Size
)

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = "__all__"

class CollectionSerializer(serializers.ModelSerializer):
   
   class Meta:
      model = Collection
      fields = "__all__"

class GenderCollectionSerializer(serializers.ModelSerializer):
   
   class Meta:
      model = GenderCollection
      fields = "__all__"

class ProductHighlightSerializer(serializers.ModelSerializer):
   
   class Meta:
      model = ProductHighlight
      fields = "__all__"

class BrandSerializer(serializers.ModelSerializer):
   class Meta:
      model = Brand
      fields = "__all__"

class SizeSerializer(serializers.ModelSerializer):
   
   class Meta:
      model = Size
      fields = "__all__"
class ProductVariantSerializer(serializers.ModelSerializer):
   
   size = SizeSerializer(read_only=True)
   class Meta:
      model = ProductVariant
      fields = [
         "id",
         "product",
         "size",
         "color",
         "image",
         "alt_text",
         "price",
         "quantity",
         "sku",
         "is_active"
      ]

class ProductSerializer(serializers.ModelSerializer):
   category = CategorySerializer(read_only= True)
   collections = CollectionSerializer(many=True,read_only=True)
   variants = ProductVariantSerializer(many=True, read_only=True)
   gender = GenderCollectionSerializer(many=True,read_only=True)
   brand = BrandSerializer( read_only=True)
   highlights = ProductHighlightSerializer( many=True, read_only=True)

   # Create / Update
   category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )

   brand_id = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source="brand",
        write_only=True,
        required=False,
        allow_null=True
    )

   collection_ids = serializers.PrimaryKeyRelatedField(
        queryset=Collection.objects.all(),
        source="collections",
        many=True,
        write_only=True,
        required=False
    )

   gender_ids = serializers.PrimaryKeyRelatedField(
        queryset=GenderCollection.objects.all(),
        source="gender",
        many=True,
        write_only=True,
        required=False
    )
   
   class Meta:
      model = Product
      fields = [
         "id",

         "p_title",
         "p_slug",
         "p_description",
         "main_thumbnail",

         "category",
         "category_id",

         "collections",
         "collection_ids",

         "gender",
         "gender_ids",

         "brand",
         "brand_id",

         "highlights",
         "variants",

         "p_status",
         "is_featured",
         "is_active",

         "created_at",
         "updated_at",
      ]