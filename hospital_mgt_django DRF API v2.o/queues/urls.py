from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QueViewSet

router = DefaultRouter()
router.register(r'queue', QueViewSet, basename='queue')

urlpatterns = [
    path('', include(router.urls)),
]