from django.db import models

# Create your models here.

class StoreLocations(models.Model):

  name = models.CharField(max_length=200)
  address = models.TextField()

  latitude = models.DecimalField(max_digits=20, decimal_places=9)
  longitude = models.DecimalField(max_digits=20, decimal_places=9)

  phone = models.CharField(max_length=20, blank=True)
  email = models.EmailField(blank=True)

  is_active = models.BooleanField(default=True)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.name