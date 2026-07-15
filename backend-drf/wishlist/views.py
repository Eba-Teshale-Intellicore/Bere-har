from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Wishlist
from .serializer import WishlistSerializer


class WishlistView(ModelViewSet):

    serializer_class = WishlistSerializer
    permission_classes = [
        IsAuthenticated
    ]


    def get_queryset(self):

        return Wishlist.objects.filter(
            user=self.request.user
            ).select_related("product")

    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )