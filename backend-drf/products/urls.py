# This struc for APivIEW AND NOT FOR mODELvIEW
# from django.urls import path
# from . import views

# urlpatterns = [
#     path("products/", views.ProductView.as_view(), name="products"),
# ]

# FOR ModelView using default router

from django.urls import path, include
from .views import ProductView,  CategoryView

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"products", ProductView, basename="products") # this create ""products/ ""
router.register(r"categories", CategoryView, basename="categories")
urlpatterns = [
  path("", include(router.urls)),
]