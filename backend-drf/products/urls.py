from django.urls import path
from . import views

urlpatterns = [
    # app urls
    path('categories/', views.categoriesView)
]