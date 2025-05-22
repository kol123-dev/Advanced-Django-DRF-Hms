from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import QueViewSet

# 🔁 Define router for Queue app
router = DefaultRouter()
router.register(r'queue', QueViewSet, basename='queue')

# Optional: Include nested routes if needed later
urlpatterns = [
    path('', include(router.urls)),
]