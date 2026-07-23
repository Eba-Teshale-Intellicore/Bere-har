from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.

class ChatAPIView(APIView):
  authentication_classes = []
  permission_classes = []

  def post(self, request):
    message = request.data.get("message")

    return Response({
      "reply": f"You say {message}"
    }
    )