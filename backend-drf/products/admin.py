from django.contrib import admin
from .models import Category, Collection, Product, ProductImage, ProductVariant

# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name', 'is_active')
    list_filter = ('category_name',)
    search_fields = ('category_name',)


class CollectionAdmin(admin.ModelAdmin):
    list_display = ('collection_title', 'is_active', 'created_at')

class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "p_title",
        "category_name",
        "p_price",
        "p_status",
        "is_featured",
        "created_at"
    )

    list_filter = (
        "p_status",
        "is_featured",
        "p_category",
    )

    search_fields = (
        "p_title",
        "p_brand",
    )


    def category_name(self,obj):
        return obj.p_category.category_name
    category_name.short_description = "Category"

    
admin.site.register(Category, CategoryAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductImage)
admin.site.register(ProductVariant)