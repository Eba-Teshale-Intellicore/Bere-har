# This struc for APivIEW AND NOT FOR mODELvIEW
# from django.urls import path
# from . import views

# urlpatterns = [
#     path("products/", views.ProductView.as_view(), name="products"),
# ]

# FOR ModelView using default router

from django.urls import path, include
from .views import CollectionView, GenderView, ProductView,  CategoryView, ProductDetailView

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"categories", CategoryView, basename="categories")
router.register(r"collections", CollectionView, basename="collections")
router.register(r"genders", GenderView, basename="genders")
router.register(r"products", ProductView, basename="products") # this create ""products/ ""
router.register(r"products/<slug:p_slug>", ProductDetailView, basename="slug")
urlpatterns = [
  path("", include(router.urls)),
]