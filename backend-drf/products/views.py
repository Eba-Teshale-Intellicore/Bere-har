# from rest_framework.response import Response
# from rest_framework.views import APIView

# class CategoriesView(APIView):
#     def get(self, request):
#         return Response({"message": "Hello World"})

from django.http import HttpResponse

def categoriesView(request):
    return HttpResponse("<h1>Hello World</h1>")