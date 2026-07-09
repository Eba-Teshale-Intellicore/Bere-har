from django.contrib import admin
from .models import (
    Category,
    Collection,
    Product,
    ProductImage,
    ProductVariant,
    GenderCollection,
    CampaignHighlight,
    CampaignProduct,
)
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
        "gender",
        "campaign",
        "p_price",
        "p_status",
        "is_featured",
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
    prepopulated_fields = {
        "p_slug": ("p_title",)
    }


    def category_name(self,obj):
        return obj.p_category.category_name
    category_name.short_description = "Category"
    def gender(self, obj):
        return obj.p_gendercollection
    gender.short_description = "Gender"
    def campaign(self, obj):
        return obj.p_campaign
    campaign.short_description = "Campaign"

class GenderCollectionAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "created_at",
    )
class CampaignHighlightAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "gendercollection",
        "category",
        "is_active",
        "created_at",
    )

    list_filter = (
        "gendercollection",
        "category",
        "is_active",
    )

    search_fields = (
        "title",
        "description",
    )

    prepopulated_fields = {
        "slug": ("title",)
    }
class CampaignProductAdmin(admin.ModelAdmin):

    list_display = (
        "campaign",
        "product",
        "order",
    )
    list_filter = (
        "campaign",
    )
    ordering = (
        "campaign",
        "order",
    )

   
admin.site.register(Category, CategoryAdmin)
admin.site.register(Collection, CollectionAdmin)
admin.site.register(Product, ProductAdmin)

admin.site.register(GenderCollection, GenderCollectionAdmin)
admin.site.register(CampaignHighlight, CampaignHighlightAdmin)
admin.site.register(CampaignProduct, CampaignProductAdmin)

admin.site.register(ProductImage )
admin.site.register(ProductVariant)