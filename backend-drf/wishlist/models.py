from django.db import models
from django.contrib.auth.models import User
from products.models import Product


class Wishlist(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="wishlist"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="wishlisted_by"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=[
                    "user",
                    "product"
                ],
                name="unique_user_product_wishlist"
            )
        ]
        
        ordering = [
        "-created_at"
        ]
    def __str__(self):
        return f"{self.user.username} - {self.product.p_title}"



# Wishlist

# I recommend that your Wishlist references the Product:

# class Wishlist(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)

# The customer usually favorites a product, not a specific size. They choose the size later when adding it to the cart.

# Cart

# Your CartItem should reference the ProductVariant:

# class CartItem(models.Model):
#     cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
#     variant = models.ForeignKey(ProductVariant, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)

# This ensures the order records the exact size and color selected.

# Final Verdict

# If I were mentoring a backend team building a DRF-based fashion store, I'd be happy with this overall direction. The architecture is normalized, easy to expose through DRF serializers, and fits naturally with a Next.js frontend.

# To make it even more production-ready, my roadmap would be:

# Replace p_brand with a Brand model.
# Replace the color CharField with a reusable Color model.
# Add a uniqueness constraint on (product, size, color) in ProductVariant.
# Build the next layers in this order:
# Wishlist
# Cart
# Orders
# Reviews
# Coupons
# Payments
# Analytics

# With those additions, you'll have a backend architecture comparable to what many professional fashion e-commerce applications use.