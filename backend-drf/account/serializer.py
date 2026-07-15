from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "confirm_password",
        ]

    def validate(self, attrs):
        password = attrs.get("password")
        confirm_password = attrs.pop("confirm_password")

        if password != confirm_password:
            raise serializers.ValidationError(
                "Passwords do not match"
            )

        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({
                "email": "Email already exists."
            })

        return attrs

    def create(self, validated_data):
        validated_data.pop("confirm_password")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        Profile.objects.create(user=user)

        return user

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    email = serializers.EmailField(
        source="user.email",
        read_only=True
    )

    class Meta:
        model = Profile
        fields = [
            "id",
            "username",
            "email",
            "profile_image",
            "phone",
            "address",
            "bio",
            "created_at",
            "updated_at",
        ]