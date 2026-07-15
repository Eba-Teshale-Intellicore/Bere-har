from django.contrib.auth.models import User
from django.db import models

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )
    profile_image = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )
    phone = models.CharField(
        max_length=20,
        blank=True
    )
    address = models.CharField(
        max_length=255,
        blank=True
    )
    bio = models.TextField(
        blank=True
    )
    created_at = models.DateTimeField(
    auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.user.email