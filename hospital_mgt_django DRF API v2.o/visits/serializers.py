from rest_framework import serializers
from .models import (
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
from users.models import User
from users.serializers import UserSerializer
from patients.models import Patient
from patients.serializers import PatientSerializer


# 🔹 1. Vital Signs Serializer
class VitalSignsSerializer(serializers.ModelSerializer):
    recorded_by = UserSerializer(read_only=True)

    class Meta:
        model = VitalSigns
        exclude = ['visit']
        read_only_fields = ['recorded_at', 'bmi', 'recorded_by']


class VitalSignsWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = VitalSigns
        exclude = ['recorded_at', 'bmi', 'recorded_by']
        extra_kwargs = {
            'visit': {'required': True}
        }


# 🔹 2. Diagnosis Serializer
class DiagnosisSerializer(serializers.ModelSerializer):
    diagnosed_by = UserSerializer(read_only=True)

    class Meta:
        model = Diagnosis
        exclude = ['visit', 'encounter']
        read_only_fields = ['diagnosed_at', 'diagnosed_by']


class DiagnosisWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diagnosis
        fields = '__all__'


# 🔹 3. Prescription Serializer
class PrescriptionSerializer(serializers.ModelSerializer):
    drug = serializers.StringRelatedField()
    prescribed_by = UserSerializer(read_only=True)

    class Meta:
        model = Prescription
        exclude = ['visit', 'encounter', 'diagnosis']
        read_only_fields = ['prescribed_at', 'prescribed_by']


class PrescriptionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prescription
        fields = '__all__'


# 🔹 4. Lab Test Order Serializer
class LabTestOrderSerializer(serializers.ModelSerializer):
    ordered_by = UserSerializer(read_only=True)
    test_type = serializers.StringRelatedField()

    class Meta:
        model = LabTestOrder
        exclude = ['visit']
        read_only_fields = ['ordered_at', 'completed_at', 'ordered_by']


class LabTestOrderWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTestOrder
        fields = '__all__'
        read_only_fields = ['completed_at', 'result']


# 🔹 5. Radiology Order Serializer
class RadiologyOrderSerializer(serializers.ModelSerializer):
    radiology_type = serializers.StringRelatedField()
    ordered_by = UserSerializer(read_only=True)

    class Meta:
        model = RadiologyOrder
        exclude = ['visit']
        read_only_fields = ['ordered_at', 'completed_at', 'ordered_by']


class RadiologyOrderWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = RadiologyOrder
        fields = '__all__'
        read_only_fields = ['completed_at', 'result_description', 'image_url']


# 🔹 6. Procedure Serializer
class ProcedureSerializer(serializers.ModelSerializer):
    performed_by = UserSerializer(read_only=True)

    class Meta:
        model = Procedure
        exclude = ['visit']
        read_only_fields = ['performed_at', 'performed_by']


class ProcedureWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = '__all__'


# 🔹 7. Referral Serializer
class ReferralSerializer(serializers.ModelSerializer):
    from_provider = UserSerializer(read_only=True)
    to_location = serializers.StringRelatedField()

    class Meta:
        model = Referral
        exclude = ['visit']
        read_only_fields = ['referred_at']


class ReferralWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Referral
        fields = '__all__'


# 🔹 8. FollowUp Serializer
class FollowUpSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)

    class Meta:
        model = FollowUp
        exclude = ['visit']
        read_only_fields = ['created_at']


class FollowUpWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowUp
        fields = '__all__'


# 🔹 9. Clinical Notes Serializer
class NoteSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Note
        exclude = ['visit']
        read_only_fields = ['created_at']


class NoteWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'


# 🔹 10. Encounter Serializer
class EncounterSerializer(serializers.ModelSerializer):
    provider = UserSerializer(read_only=True)
    diagnoses = DiagnosisSerializer(many=True, read_only=True)
    prescriptions = PrescriptionSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Encounter
        exclude = ['visit']
        read_only_fields = ['created_at', 'updated_at']


class EncounterWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encounter
        fields = [
            'visit',
            'chief_complaint',
            'history_of_present_illness',
            'physical_examination',
            'findings_summary'
        ]


# 🔹 11. Visit Detail Serializer
class VisitDetailSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    encounters = EncounterSerializer(many=True, read_only=True)
    vitals = VitalSignsSerializer(many=True, read_only=True)
    diagnoses = DiagnosisSerializer(many=True, read_only=True)
    prescriptions = PrescriptionSerializer(many=True, read_only=True)
    lab_orders = LabTestOrderSerializer(many=True, read_only=True)
    radiology_orders = RadiologyOrderSerializer(many=True, read_only=True)
    procedures = ProcedureSerializer(many=True, read_only=True)
    referrals = ReferralSerializer(many=True, read_only=True)
    followups = FollowUpSerializer(many=True, read_only=True)
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Visit
        fields = [
            'id',
            'start_time',
            'end_time',
            'visit_type',
            'status',
            'reason_for_visit',
            'referring_doctor',
            'visit_notes',
            # Related Data
            'patient',
            'encounters',
            'vitals',
            'diagnoses',
            'prescriptions',
            'lab_orders',
            'radiology_orders',
            'procedures',
            'referrals',
            'followups',
            'notes',
        ]
        read_only_fields = ['start_time', 'end_time']


# 🔹 12. Visit List Serializer (lighter version)
class VisitListSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = Visit
        fields = ['id', 'patient', 'visit_type', 'status', 'start_time', 'end_time', 'location']
        read_only_fields = ['start_time', 'end_time']


# 🔹 13. Visit Write Serializer
class VisitWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visit
        fields = '__all__'