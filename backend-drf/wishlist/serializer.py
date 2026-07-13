from rest_framework import serializers
from .models import Wishlist
from products.models import ProductImage
from products.serializer import (
    ProductImageSerializer,
    ProductVariantSerializer,
)


class WishlistSerializer(serializers.ModelSerializer):
    image = ProductImageSerializer(read_only=True)

    image_id = serializers.PrimaryKeyRelatedField(
        queryset=ProductImage.objects.all(),
        source="image",
        write_only=True,
    )

    title = serializers.CharField(
        source="image.product.p_title",
        read_only=True,
    )

    price = serializers.CharField(
        source="image.product.p_price",
        read_only=True,
    )

    variants = ProductVariantSerializer(
        source="image.product.variants",
        many=True,
        read_only=True,
    )

    class Meta:
        model = Wishlist
        fields = [
            "id",
            "image",
            "image_id",
            "title",
            "price",
            "variants",
            "created_at",
        ]