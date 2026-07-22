from django.urls import path, include
from .views import LocationView

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"store-location", LocationView, basename="store")

urlpatterns = [
  path("", include(router.urls))
]