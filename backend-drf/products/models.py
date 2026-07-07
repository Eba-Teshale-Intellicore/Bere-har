from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    slug = models.SlugField(
        max_length=200,
        unique=True
    )

    # image = models.ImageField(
    #     upload_to="categories/",
    #     blank=True,
    #     null=True
    # )

    description = models.TextField(
        blank=True
    )

    is_active = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
      verbose_name = "Category"
      verbose_name_plural = "Categories"


    def __str__(self):
        return self.name