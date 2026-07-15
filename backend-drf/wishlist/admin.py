from django.contrib import admin
from .models import Wishlist

# Register your models here.
class WishlistAdmin(admin.ModelAdmin):

    list_display = (
        "user",
        "product",
        "created_at",
    )

    list_filter = (
        "created_at",
    )

    search_fields = (
        "user__username",
        "user__email",
        "product__p_title",
    )

    autocomplete_fields = (
        "user",
        "product",
    )

    ordering = (
        "-created_at",
    )

    list_select_related = (
        "user",
        "product",
    )
  
admin.site.register(Wishlist, WishlistAdmin)

