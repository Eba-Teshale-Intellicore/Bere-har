from rest_framework import serializers
from .models import (
    CampaignProduct,
    Category,
    Collection,
    Product,
    ProductImage,
    ProductVariant,
    GenderCollection,
    CampaignHighlight,
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

class ProductImageSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductImage
    fields = "__all__"


class ProductVariantSerializer(serializers.ModelSerializer):
  class Meta:
    model = ProductVariant
    fields = "__all__"

class CampaignHighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignHighlight
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "banner",
            "category",
            "gendercollection",
            "campaign_products",
        ]

class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, required=False)
    variants = ProductVariantSerializer(many=True, read_only=True)
    campaign = CampaignHighlightSerializer(
        source="p_campaign",
        read_only=True
    )
    category = CategorySerializer(
        source="p_category",
        read_only=True
    )
    gendercollection = GenderCollectionSerializer(
       source= "p_gendercollection",
       read_only = True
    )
    class Meta:
        model = Product
        fields = [
            "id",
            "p_title",
            "p_slug",
            "p_description",
            "p_price",

            "category",
            "p_collection",
            "p_gendercollection",

            "p_brand",
            "p_status",

            "campaign",

            "is_featured",
            "is_active",

            "images",
            "variants",

            "created_at",
            "updated_at",
            "gendercollection",
        ]

    def validate_images(self, value):
        """
        Minimum two images required
        """

        if len(value) < 2:
            raise serializers.ValidationError(
                "A product must have at least two images."
            )
        return value
class CampaignProductSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)
    class Meta:
        model = CampaignProduct
        fields = [
            "id",
            "product",
            "order",
        ]

