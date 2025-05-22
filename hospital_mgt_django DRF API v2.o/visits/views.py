from rest_framework import viewsets, permissions, status, serializers, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound

# 🔹 Import Models
from .models import (
    Patient,
    Visit,
    Encounter,
    VitalSigns,
    Diagnosis,
    Prescription,
    LabTestOrder,
    RadiologyOrder,
    Procedure,
    Referral,
    FollowUp,
    Note
)

# 🔹 Import Serializers
from .serializers import (
    # Read Serializers
    EncounterSerializer,
    VisitListSerializer, 
    VisitDetailSerializer, 
    VisitWriteSerializer,
    VitalSignsSerializer,
    DiagnosisSerializer,
    PrescriptionSerializer,
    LabTestOrderSerializer,
    RadiologyOrderSerializer,
    ProcedureSerializer,
    ReferralSerializer,
    FollowUpSerializer,
    NoteSerializer,

    # Write Serializers
    EncounterWriteSerializer,
    VitalSignsWriteSerializer,
    DiagnosisWriteSerializer,
    PrescriptionWriteSerializer,
    LabTestOrderWriteSerializer,
    RadiologyOrderWriteSerializer,
    ProcedureWriteSerializer,
    ReferralWriteSerializer,
    FollowUpWriteSerializer,
    NoteWriteSerializer
)

# 🔹 Import Custom Permissions from users app
from users.permissions import (
    IsDoctor,
    IsNurse,
    IsReceptionist,
    IsHospitalAdmin,
    IsLabTechnician,
    IsRadiologist,
    IsPharmacist,
    IsAdminOrDoctor,
    IsAccountant
)


# 🧱 Base ViewSet With Debug Print
class BaseViewSet(viewsets.ModelViewSet):
    def get_serializer_class(self):
        # Override to return appropriate serializer based on action
        if self.action in ['create', 'update', 'partial_update']:
            return getattr(self, 'serializer_write_class', self.serializer_class)
        return self.serializer_class

    def get_permissions(self):
        perms = super().get_permissions()
        print(f"User: {self.request.user}, Role: {self.request.user.role}, Permissions: {[p.__class__.__name__ for p in perms]}")
        return perms


class VisitViewSet(BaseViewSet):
    """
    ViewSet for managing visits.
    Supports filtering via ?patient=<id>
    """
    serializer_class = VisitDetailSerializer
    serializer_classes = {
        'list': VisitListSerializer,
        'retrieve': VisitDetailSerializer,
        'create': VisitWriteSerializer,
        'update': VisitWriteSerializer,
        'partial_update': VisitWriteSerializer
    }

    def get_serializer_class(self):
        return self.serializer_classes.get(self.action, self.serializer_class)

    def get_queryset(self):
        user = self.request.user

        # 🔁 Base queryset
        queryset = Visit.objects.all()

        # 📋 Filter by patient ID from query params
        patient_id = self.request.query_params.get('patient', None)
        if patient_id:
            try:
                # Validate that the patient exists
                Patient.objects.get(id=patient_id)
                queryset = queryset.filter(patient_id=patient_id)
            except Patient.DoesNotExist:
                raise NotFound(detail="Patient not found.")

        # 🔐 Role-based filtering
        if user.role == 'Receptionist':
            queryset = queryset.filter(status='scheduled')

        return queryset.select_related('patient').prefetch_related(
            'vitals',
            'diagnoses',
            'prescriptions',
            'lab_orders',
            'radiology_orders',
            'procedures',
            'referrals',
            'followups',
            'notes'
        ).order_by('-start_time')
    
# 🔹 2. Encounter ViewSet
class EncounterViewSet(BaseViewSet):
    queryset = Encounter.objects.all()
    serializer_class = EncounterSerializer
    serializer_write_class = EncounterWriteSerializer
    permission_classes = [IsDoctor]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return Encounter.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        serializer.save(provider=self.request.user, visit_id=self.kwargs['visit_pk'])

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 3. Vital Signs ViewSet
class VitalSignsViewSet(BaseViewSet):
    serializer_class = VitalSignsSerializer
    serializer_write_class = VitalSignsWriteSerializer
    permission_classes = [IsNurse | IsDoctor]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return VitalSigns.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit, recorded_by=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 4. Diagnosis ViewSet
class DiagnosisViewSet(BaseViewSet):
    serializer_class = DiagnosisSerializer
    serializer_write_class = DiagnosisWriteSerializer
    permission_classes = [IsDoctor]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return Diagnosis.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit, diagnosed_by=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 5. Prescription ViewSet
class PrescriptionViewSet(BaseViewSet):
    serializer_class = PrescriptionSerializer
    serializer_write_class = PrescriptionWriteSerializer
    permission_classes = [IsDoctor]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return Prescription.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit, prescribed_by=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 6. Lab Test Order ViewSet
class LabTestOrderViewSet(BaseViewSet):
    serializer_class = LabTestOrderSerializer
    serializer_write_class = LabTestOrderWriteSerializer
    permission_classes = [IsDoctor | IsLabTechnician]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return LabTestOrder.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        if self.request.user.role != 'Doctor':
            raise serializers.ValidationError("Only doctors can order lab tests.")
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit, ordered_by=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 7. Radiology Order ViewSet
class RadiologyOrderViewSet(BaseViewSet):
    serializer_class = RadiologyOrderSerializer
    serializer_write_class = RadiologyOrderWriteSerializer
    permission_classes = [IsDoctor | IsRadiologist]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return RadiologyOrder.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit, ordered_by=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 8. Procedure ViewSet
class ProcedureViewSet(BaseViewSet):
    serializer_class = ProcedureSerializer
    serializer_write_class = ProcedureWriteSerializer
    permission_classes = [IsDoctor]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return Procedure.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit, performed_by=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 9. Referral ViewSet
class ReferralViewSet(BaseViewSet):
    serializer_class = ReferralSerializer
    serializer_write_class = ReferralWriteSerializer
    permission_classes = [IsDoctor]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return Referral.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 10. FollowUp ViewSet
class FollowUpViewSet(BaseViewSet):
    serializer_class = FollowUpSerializer
    serializer_write_class = FollowUpWriteSerializer
    permission_classes = [IsDoctor]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return FollowUp.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj

# 🔹 11. Clinical Notes ViewSet
class NoteViewSet(BaseViewSet):
    serializer_class = NoteSerializer
    serializer_write_class = NoteWriteSerializer
    permission_classes = [IsDoctor | IsNurse]
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def get_queryset(self):
        return Note.objects.filter(visit_id=self.kwargs['visit_pk'])

    def perform_create(self, serializer):
        if self.request.user.role not in ['Doctor', 'Nurse']:
            raise serializers.ValidationError("Only doctors or nurses can add notes.")
        visit = Visit.objects.get(id=self.kwargs['visit_pk'])
        serializer.save(visit=visit, author=self.request.user)

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs['pk'])
        return obj