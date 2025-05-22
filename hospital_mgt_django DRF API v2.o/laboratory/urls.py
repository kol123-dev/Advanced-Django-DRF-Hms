from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LabTestCategoryViewSet,
    LabTestTypeViewSet,
    LabTestOrderViewSet,
    LabResultAttachmentViewSet,
    LabDashboardStats
)

router = DefaultRouter()
router.register(r'test-categories', LabTestCategoryViewSet, basename='lab-test-category')
router.register(r'test-types', LabTestTypeViewSet, basename='lab-test-type')
router.register(r'orders', LabTestOrderViewSet, basename='lab-order')
router.register(r'result-attachments', LabResultAttachmentViewSet, basename='lab-result-attachment')

urlpatterns = [
    # Main Laboratory API Endpoints
    path('api/lab/', include(router.urls)),

    # Dashboard Stats
    path('api/lab/dashboard/stats/', LabDashboardStats.as_view(), name='lab-dashboard-stats'),
]