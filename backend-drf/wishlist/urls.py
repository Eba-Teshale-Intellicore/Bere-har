
from django.urls import path, include
from .views import WishlistView

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"wishlists", WishlistView, basename="wishlist")

urlpatterns = [
  path("", include(router.urls))
]