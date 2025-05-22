from rest_framework import viewsets, permissions
from .models import (
    Patient,
    ChronicCondition,
    Medication,
    Allergy,
    SurgicalHistory,
    FamilyHistory,
)
from .serializers import (
    PatientSerializer,
    ChronicConditionSerializer,
    AllergySerializer,
    SurgicalHistorySerializer,
    FamilyHistorySerializer,
    MedicationSerializer
)
# 🔽 imports for custom permissions
from users.permissions import (
    IsAdminOrDoctor,
    IsSuperUser,
    IsHospitalAdmin,
    IsDoctor,
    IsNurse,
    IsReceptionist,
    IsLabTechnician,
    IsPharmacist,
    IsAccountant,
)

class BaseViewSet(viewsets.ModelViewSet):
    """
    Optional base class to help with debugging.
    """
    def get_permissions(self):
        perms = super().get_permissions()
        print(f"User: {self.request.user}, Role: {self.request.user.role}, Permissions: {perms}")
        return perms


# 🔹 Patient ViewSet – Admins, Doctors can edit; others read-only
class PatientViewSet(BaseViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsAdminOrDoctor()]
        return [permissions.IsAuthenticated()]

# 🔹 Chronic Condition ViewSet – Only Doctors can edit
class ChronicConditionViewSet(BaseViewSet):
    serializer_class = ChronicConditionSerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return ChronicCondition.objects.filter(patient_id=self.kwargs['patient_pk'])


# 🔹 Medication ViewSet – Only Doctors can manage
class MedicationViewSet(BaseViewSet):
    serializer_class = MedicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def get_queryset(self):
        condition_id = self.kwargs['chroniccondition_pk']
        return Medication.objects.filter(chronic_condition_id=condition_id)


# 🔹 Allergies ViewSet – Only Doctors can edit
class AllergyViewSet(BaseViewSet):
    serializer_class = AllergySerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return Allergy.objects.filter(patient_id=self.kwargs['patient_pk'])


# 🔹 Surgical History ViewSet – Only Doctors can edit
class SurgicalHistoryViewSet(BaseViewSet):
    serializer_class = SurgicalHistorySerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return SurgicalHistory.objects.filter(patient_id=self.kwargs['patient_pk'])


# 🔹 Family History ViewSet – Only Doctors can edit
class FamilyHistoryViewSet(BaseViewSet):
    serializer_class = FamilyHistorySerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return FamilyHistory.objects.filter(patient_id=self.kwargs['patient_pk'])