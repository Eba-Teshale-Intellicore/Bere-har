from django.urls import path, include
from .views import RegisterView, ProfileView

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"profile", ProfileView, basename="profile")
urlpatterns = [
  path("", include(router.urls)),
  path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),
]
