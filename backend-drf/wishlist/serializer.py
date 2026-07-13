from rest_framework import serializers
from .models import Wishlist
from products.models import Product
from products.serializer import ProductSerializer


class WishlistSerializer(serializers.ModelSerializer):

    product = ProductSerializer(read_only=True)

    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source="product",
        write_only=True
    )

    class Meta:
        model = Wishlist
        fields = [
            "id",
            "product",
            "product_id",
            "created_at"
        ]