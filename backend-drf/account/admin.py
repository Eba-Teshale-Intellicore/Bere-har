from django.contrib import admin
from django.contrib.auth.models import User
from .models import Profile

admin.site.unregister(User)

class UserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "is_staff",
    )

    search_fields = (
        "username",
        "email",
    )

class ProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "phone",
        "address",
        "bio",
    )

admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)