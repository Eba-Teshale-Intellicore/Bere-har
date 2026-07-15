from django.db import models
from django.utils.text import slugify


class Category(models.Model):

    category_name = models.CharField(
        max_length=100,
        unique=True
    )

    category_slug = models.SlugField(
        unique=True,
        blank=True
    )

    category_description = models.TextField(
        blank=True
    )

    is_active = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    def save(self, *args, **kwargs):
        if not self.category_slug:
            self.category_slug = slugify(
                self.category_name
            )
        super().save(*args, **kwargs)


    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


    def __str__(self):
        return self.category_name
class Collection(models.Model):

   collection_title = models.CharField(max_length=200)
   collection_description = models.TextField(blank=True)
   collection_banner = models.ImageField(upload_to="collections/")
   collection_cover = models.ImageField(upload_to="collections/covers/",blank=True,null=True)
   is_active = models.BooleanField(default=False)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)

   class Meta:
      verbose_name = "Collection"
      verbose_name_plural = "Collections"


   def __str__(self):
      return self.collection_title

GENDER_CHOICES = (
    ('women', 'Women'),
    ('men', 'Men'),
    ('kids', 'Kids'),
    ('unisex', 'Unisex'),
)
class GenderCollection(models.Model):
   title = models.CharField(max_length=100,choices=GENDER_CHOICES,blank=True,null=True)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)

   def __str__(self):
      return self.title

class ProductHighlight(models.Model):
    title = models.CharField(max_length=100)

    icon = models.CharField(
        max_length=100,
        blank=True
    )

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title 
# New Arrival

# This should not be stored in the database.

# It is business logic.

# Example

# Newest 12 products

# Product.objects.order_by("-created_at")[:12]

# Those are

# New Arrival

# No model needed.
STATUS_CHOICES = (
    ('draft', 'Draft'),
    ('published', 'Published'),
)

class Brand(models.Model):
    name = models.CharField(max_length=100)
    logo = models.ImageField(
        upload_to="brands/",
        blank=True,
        null=True
    )
    slug = models.SlugField(unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
class Product(models.Model):
   p_title = models.CharField(max_length=200)
   p_slug = models.SlugField(unique=True,blank=True)
   p_description = models.TextField(blank=True)
   main_thumbnail = models.ImageField(upload_to="products/thumbnails/")
   category = models.ForeignKey(Category, on_delete=models.CASCADE)
   collections = models.ManyToManyField(
    Collection,
    blank=True,
    related_name="products"
)
   gender = models.ManyToManyField(
    GenderCollection,
    blank=True,
    related_name="products"
)
   brand = models.ForeignKey(
    Brand,
    on_delete=models.SET_NULL,
    null=True,
    blank=True
)
   highlights = models.ManyToManyField(
        ProductHighlight,
        blank=True
    )
   p_status = models.CharField(max_length=50,choices=STATUS_CHOICES, default="draft")
   is_featured = models.BooleanField(default=False)
   is_active = models.BooleanField(default=True)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)

   def save(self, *args, **kwargs):
        if not self.p_slug:
            self.p_slug = slugify(
                self.p_title
            )
        super().save(*args, **kwargs)

   def __str__(self):
      return self.p_title
   
class Size(models.Model):
    name = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name
class ProductVariant(models.Model):
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="variants"
    )

    size = models.ForeignKey(
        Size,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )

    color = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )
    image = models.ImageField(upload_to="products/variants/")
    alt_text = models.CharField(max_length=255,blank=True)
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    quantity = models.PositiveIntegerField(default=0)

    sku = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )
    is_active = models.BooleanField(default=True)

    order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ["order"]

        constraints = [
            models.UniqueConstraint(
                fields=["product", "size", "color"],
                name="unique_variant"
            )
        ]
    @property
    def in_stock(self):
        return self.quantity > 0

    def __str__(self):
        return f"{self.product.p_title} - {self.color} - {self.size}"
