from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Wishlist
from .serializer import WishlistSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class WishlistView(ModelViewSet):
  # queryset = Wishlist.objects.all()
  queryset = Wishlist.objects.select_related(
    "product",
    "user"
    )
  serializer_class = WishlistSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    return Wishlist.objects.filter(user=self.request.user)

  def perform_create(self, serializer):
    serializer.save(user=self.request.user)