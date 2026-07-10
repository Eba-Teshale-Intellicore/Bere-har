from django.urls import path, include
from .views import RegisterView, ProfileView

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r"profile", ProfileView, basename="profile")
urlpatterns = [
  path("", include(router.urls)),
  path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
