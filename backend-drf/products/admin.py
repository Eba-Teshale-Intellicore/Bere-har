from django.contrib import admin
from .models import Category

class CategoryAdmin(admin.ModelAdmin):
  list_display =('name', 'is_active')
  list_filter = ("name",)
  search_fields =('name',)

# Register your models here.
admin.site.register(Category, CategoryAdmin)