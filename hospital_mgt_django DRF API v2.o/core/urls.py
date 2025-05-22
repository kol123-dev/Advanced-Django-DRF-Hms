# core/urls.py
"""
URL configuration for core project.
"""

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested.routers import NestedSimpleRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# 🔹 Import ViewSets from users/patients apps
from users.views import UserViewSet, CurrentUserView
from patients.views import (
    PatientViewSet,
    ChronicConditionViewSet,
    MedicationViewSet,
    AllergyViewSet,
    SurgicalHistoryViewSet,
    FamilyHistoryViewSet,
)

# 🔹 Import ViewSets from visits app
from visits.views import (
    VisitViewSet,
    EncounterViewSet,
    VitalSignsViewSet,
    DiagnosisViewSet,
    PrescriptionViewSet,
    LabTestOrderViewSet,
    RadiologyOrderViewSet,
    ProcedureViewSet,
    ReferralViewSet,
    FollowUpViewSet,
    NoteViewSet
)
from queues.views import QueViewSet

# Main Routers
router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'visits', VisitViewSet, basename='visit')

# Nested Routers under Patients
patient_router = NestedSimpleRouter(router, r'patients', lookup='patient')
patient_router.register(r'chronic-conditions', ChronicConditionViewSet, basename='patient-chronic-condition')
patient_router.register(r'allergies', AllergyViewSet, basename='patient-allergy')
patient_router.register(r'surgical-history', SurgicalHistoryViewSet, basename='patient-surgical-history')
patient_router.register(r'family-history', FamilyHistoryViewSet, basename='patient-family-history')

# Medications (nested under chronic conditions)
medication_router = NestedSimpleRouter(patient_router, r'chronic-conditions', lookup='chronic_condition')
medication_router.register(r'medications', MedicationViewSet, basename='patient-medication')

# Nested Routers under Visits
visit_router = NestedSimpleRouter(router, r'visits', lookup='visit')
visit_router.register(r'encounters', EncounterViewSet, basename='visit-encounter')
visit_router.register(r'vitals', VitalSignsViewSet, basename='visit-vitals')
visit_router.register(r'diagnoses', DiagnosisViewSet, basename='visit-diagnosis')
visit_router.register(r'prescriptions', PrescriptionViewSet, basename='visit-prescription')
visit_router.register(r'lab-orders', LabTestOrderViewSet, basename='visit-lab-order')
visit_router.register(r'radiology-orders', RadiologyOrderViewSet, basename='visit-radiology-order')
visit_router.register(r'procedures', ProcedureViewSet, basename='visit-procedure')
visit_router.register(r'referrals', ReferralViewSet, basename='visit-referral')
visit_router.register(r'followups', FollowUpViewSet, basename='visit-followup')
visit_router.register(r'notes', NoteViewSet, basename='visit-note')
visit_router.register(r'queue', QueViewSet, basename='visit-queue') # 👈 Nested under visits

urlpatterns = [
    path('admin/', admin.site.urls),

    # 🔐 Auth URLs
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # 🧾 User Self Profile URL
    path('api/me/', CurrentUserView.as_view(), name='current-user'),  # 👈 /me/

    # 📡 API URLs - Main and Nested Routes
    path('api/', include(router.urls)),
    path('api/', include(patient_router.urls)),
    path('api/', include(medication_router.urls)),
    path('api/', include(visit_router.urls)),
    
    # 🧪 Laboratory Module     
    path('', include('laboratory.urls')),  # Includes /api/lab/* routes

    
    path('api/', include('queues.urls')), 


]