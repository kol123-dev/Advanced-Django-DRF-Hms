from rest_framework import viewsets, permissions, filters
from django.db.models import Count, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import LabTestCategory, LabTestType,  LabResultAttachment
from rest_framework.permissions import IsAuthenticated
from .filters import get_lab_dashboard_stats
from .serializers import (
    LabTestCategorySerializer,
    LabTestCategoryWriteSerializer,
    LabTestTypeSerializer,
    LabTestTypeWriteSerializer,
    LabTestOrderSerializer,
    LabTestOrderWriteSerializer,
    LabResultAttachmentSerializer,
    LabResultAttachmentWriteSerializer,
)
from visits.models import LabTestOrder


class LabTestCategoryViewSet(viewsets.ModelViewSet):
    queryset = LabTestCategory.objects.all()
    serializer_class = LabTestCategorySerializer
    permission_classes = [permissions.IsAdminUser]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return LabTestCategoryWriteSerializer
        return super().get_serializer_class()


class LabTestTypeViewSet(viewsets.ModelViewSet):
    queryset = LabTestType.objects.all()
    serializer_class = LabTestTypeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description', 'category__name']

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return LabTestTypeWriteSerializer
        return super().get_serializer_class()


class LabTestOrderViewSet(viewsets.ModelViewSet):
    queryset = LabTestOrder.objects.all()
    serializer_class = LabTestOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, 'django_filters.rest_framework.DjangoFilterBackend']
    search_fields = ['test_type__name', 'patient__first_name', 'patient__last_name', 'ordered_by__email']
    ordering_fields = ['ordered_at', 'estimated_completion_time', 'status']
    filterset_class = 'laboratory.filters.LabTestOrderFilter'

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return LabTestOrderWriteSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        user = self.request.user
        # Optional: Filter by role
        if user.role == 'LabTechnician':
            return self.queryset.filter(status='in_progress')
        return self.queryset.select_related('patient', 'test_type', 'ordered_by')


class LabResultAttachmentViewSet(viewsets.ModelViewSet):
    queryset = LabResultAttachment.objects.all()
    serializer_class = LabResultAttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return LabResultAttachmentWriteSerializer
        return super().get_serializer_class()

    def get_queryset(self):
        return self.queryset.filter(uploaded_by=self.request.user)
    
class LabDashboardStats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        stats = get_lab_dashboard_stats()
        return Response(stats)