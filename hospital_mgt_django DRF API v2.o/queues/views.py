from rest_framework import viewsets, serializers, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Que
from .serializers import QueSerializer, QueWriteSerializer
from django.utils import timezone

class QueViewSet(viewsets.ModelViewSet):
    serializer_class = QueSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return QueWriteSerializer
        return QueSerializer

    def get_queryset(self):
        queryset = Que.objects.all().order_by('-arrival_time')

        # Filter by visit_pk if available (nested route)
        visit_pk = self.kwargs.get('visit_pk')
        if visit_pk:
            queryset = queryset.filter(visit_id=visit_pk)

        # Filter by department
        department = self.request.query_params.get('department', None)
        if department:
            queryset = queryset.filter(department__iexact=department)

        # Filter by priority
        priority = self.request.query_params.get('priority', None)
        if priority:
            queryset = queryset.filter(priority__iexact=priority)

        # Filter by status
        status = self.request.query_params.get('status', None)
        if status:
            queryset = queryset.filter(status__iexact=status)

        return queryset

    def perform_create(self, serializer):
        """
        Automatically set arrival_time and created_by
        """
        visit_id = self.kwargs.get('visit_pk')
        if not visit_id:
            raise serializers.ValidationError("Visit ID is required to add patient to queue.")

        serializer.save(
            visit_id=visit_id,
            assigned_to=self.request.user
        )

    @action(detail=False, methods=['get'], url_path='stats')
    def stats(self, request):
        """
        Returns filtered statistics based on current queryset
        Example: /api/queue/stats/?department=Triage
        """
        queryset = self.get_queryset()

        total_waiting = queryset.filter(status='Waiting').count()
        avg_wait_time = queryset.filter(start_time__isnull=False).values_list('start_time', 'arrival_time')

        average_time = None
        if avg_wait_time.exists():
            average_time = sum(
                (timezone.make_naive(s[0]) - timezone.make_naive(s[1])).total_seconds()
                for s in avg_wait_time
            ) // avg_wait_time.count()

        return Response({
            "total_waiting": total_waiting,
            "average_wait_time_minutes": round(average_time / 60) if average_time else 0,
            "filtered_queue_count": queryset.count(),
            "by_department": {
                dept: queryset.filter(department__iexact=dept).count()
                for dept in dict(Que.DEPARTMENT_CHOICES).keys()
            },
            "by_priority": {
                prio: queryset.filter(priority__iexact=prio).count()
                for prio in dict(Que.PRIORITY_CHOICES).keys()
            },
            "by_status": {
                stat: queryset.filter(status__iexact=stat).count()
                for stat in dict(Que.STATUS_CHOICES).keys()
            }
        })