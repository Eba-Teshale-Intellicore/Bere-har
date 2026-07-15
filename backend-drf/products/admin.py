from django.contrib import admin
from .models import (
    Category,
    Collection,
    Product,
    ProductVariant,
    GenderCollection,
    Brand,
    Size,
    ProductVariant,
    ProductHighlight
)
# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name', 'is_active')
    list_filter = ('category_name',)
    search_fields = ('category_name',)
    prepopulated_fields = {
        "category_slug": ("category_name",)
    }


class CollectionAdmin(admin.ModelAdmin):
    list_display = ('collection_title', 'is_active', 'created_at')
    search_fields = (
        "collection_title",
    )

class GenderCollectionAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "created_at",
    )

class ProductHighlightAdmin(admin.ModelAdmin):
    list_display =(
        "title",
        "is_active"
    )

class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "brand",
        "gender_list",
        "status",
        "featured",
        "active",
        "created_at",
    )
    list_filter = (
        "p_status",
        "is_featured",
        "category",
    )

    search_fields = (
        "p_title",
        "brand__name",
    )
    prepopulated_fields = {
        "p_slug": ("p_title",)
    }

    def title(self, obj):
        return obj.p_title
    title.short_description = "Title"
    def description(self, obj):
        return obj.p_description
    description.short_description = "Description"
    def status(self, obj):
        return obj.p_status
    status.short_description = "Status"
    def gender_list(self, obj):
        return ", ".join(
            g.title
            for g in obj.gender.all()
        )
    gender_list.short_description = "Gender"
    def featured(self, obj):
        return obj.is_featured

    featured.boolean = True

    def active(self, obj):
        return obj.is_active
    active.boolean = True
class ProductVariantAdmin(admin.ModelAdmin):

    list_display = (
        "product",
        "size",
        "color",
        "price",
        "quantity",
        "is_active",
    )

    list_filter = (
        "size",
        "is_active",
    )

    search_fields = (
        "product__p_title",
        "sku",
    )

admin.site.register(Category, CategoryAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Product, ProductAdmin)

admin.site.register(GenderCollection, GenderCollectionAdmin)

admin.site.register(Brand)
admin.site.register(Size)
admin.site.register(ProductVariant, ProductVariantAdmin)
admin.site.register(ProductHighlight, ProductHighlightAdmin)