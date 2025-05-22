import django_filters
from visits.models import LabTestOrder
from django.utils import timezone
from django.db.models import Q

class LabTestOrderFilter(django_filters.FilterSet):
    status = django_filters.CharFilter(field_name='status', lookup_expr='iexact')
    patient = django_filters.NumberFilter(field_name='patient_id')
    test_type = django_filters.NumberFilter(field_name='test_type_id')
    start_date = django_filters.DateFilter(field_name='ordered_at', lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name='ordered_at', lookup_expr='lte')

    class Meta:
        model = LabTestOrder
        fields = ['status', 'patient', 'test_type', 'start_date', 'end_date']


def get_lab_dashboard_stats():
    now = timezone.now()
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

    total_tests = LabTestOrder.objects.count()

    pending = LabTestOrder.objects.filter(status='pending').count()
    in_progress = LabTestOrder.objects.filter(status='in_progress').count()
    completed_today = LabTestOrder.objects.filter(completed_at__gte=today_start).count()
    completed_this_week = LabTestOrder.objects.filter(
        completed_at__gte=now - timezone.timedelta(days=7)
    ).count()

    return {
        'total_tests': total_tests,
        'pending': pending,
        'in_progress': in_progress,
        'completed_today': completed_today,
        'completed_this_week': completed_this_week,
    }