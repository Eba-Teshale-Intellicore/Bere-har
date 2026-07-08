from django.db import models

# Create your models here.
class Category(models.Model):

    category_name = models.CharField(max_length=100, unique=True)
    category_slug = models.SlugField(
        max_length=200,
        unique=True
    )
    category_description = models.TextField(
        blank=True
    )
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
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


STATUS_CHOICES = (
    ('draft', 'Draft'),
    ('published', 'Published'),
)
class Product(models.Model):
   p_title = models.CharField(max_length=200)
   p_slug = models.SlugField(unique=True)
   p_description = models.TextField(blank=True)
   p_price = models.DecimalField(max_digits=10,decimal_places=2)
   p_category = models.ForeignKey(Category, on_delete=models.CASCADE)
   p_collection = models.ForeignKey(Collection,on_delete=models.SET_NULL,blank=True,null=True)
   p_brand = models.CharField(max_length=100,blank=True)
   p_status = models.CharField(max_length=50,choices=STATUS_CHOICES, default="draft")
   is_featured = models.BooleanField(default=False)
   is_active = models.BooleanField(default=True)
   created_at = models.DateTimeField(auto_now_add=True)
   updated_at = models.DateTimeField(auto_now=True)

   def __str__(self):
      return self.p_title
   
class ProductImage(models.Model):
   product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="images")
   image = models.ImageField(upload_to="products/")
   is_primary = models.BooleanField(default=False)
   order = models.PositiveIntegerField(default=0)
   class Meta:
    ordering = ["order"]

   def __str__(self):
      return self.product.p_title
   
SIZE_CHOICES = (
    ('all', 'All'),
    ('xs', 'XS'),
    ('s', 'S'),
    ('m', "M"),
    ('l', 'L'),
    ('xl', 'XL'),
)
class ProductVariant(models.Model):
   product = models.ForeignKey(Product,on_delete=models.CASCADE,related_name="variants")
   size = models.CharField(max_length=10,choices=SIZE_CHOICES, default="m")
   color = models.CharField(max_length=50,blank=True, null=True)
   price = models.DecimalField(max_digits=10, decimal_places=2 )
   is_active = models.BooleanField(default=False)
   sku = models.CharField(
    max_length=100,
    blank=True,
    null=True
)

   def __str__(self):
      return self.product.p_title