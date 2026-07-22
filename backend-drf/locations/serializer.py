from rest_framework import serializers

from .models import StoreLocations

class LocationSerializer(serializers.ModelSerializer):

  class Meta:
    model = StoreLocations
    fields = "__all__"