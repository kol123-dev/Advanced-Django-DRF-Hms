from rest_framework import serializers
from .models import (
    Patient,
    ChronicCondition,
    Medication,
    Allergy,
    SurgicalHistory,
    FamilyHistory,
)


# 🔹 Medication Serializer
class MedicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medication
        fields = [
            'id',
            'name',
            'dosage',
            'frequency',
            'start_date',
            'end_date',
            'notes'
        ]


# 🔹 Chronic Condition Serializer (with medications nested)
class ChronicConditionSerializer(serializers.ModelSerializer):
    medications = MedicationSerializer(many=True, read_only=True)

    class Meta:
        model = ChronicCondition
        fields = [
            'id',
            'condition',
            'diagnosed_date',
            'active',
            'notes',
            'medications'
        ]


# 🔹 Allergy Serializer
class AllergySerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergy
        fields = [
            'id',
            'allergen',
            'severity',
            'reaction'
        ]


# 🔹 Surgical History Serializer
class SurgicalHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SurgicalHistory
        fields = [
            'id',
            'procedure',
            'date_performed',
            'hospital',
            'notes'
        ]


# 🔹 Family History Serializer
class FamilyHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = FamilyHistory
        fields = [
            'id',
            'relative',
            'condition',
            'notes'
        ]


# 🔹 1. Patient Detail Serializer (for GET requests)
class PatientDetailSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    chronic_conditions = ChronicConditionSerializer(many=True, read_only=True)
    allergies = AllergySerializer(many=True, read_only=True)
    surgical_history = SurgicalHistorySerializer(many=True, read_only=True)
    family_history = FamilyHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Patient
        fields = [
            'id',
            'mrn',
            'first_name',
            'last_name',
            'date_of_birth',
            'gender',
            'blood_group',
            'age',
            'phone',
            'email',
            'address',
            'mode_of_payment',
            'insurance',
            'discharged_time',
            'emergency_contact_name',
            'emergency_contact_phone',
            'notes',
            'created_at',
            'updated_at',
            # Nested medical history
            'chronic_conditions',
            'allergies',
            'surgical_history',
            'family_history',
        ]
        read_only_fields = ['mrn', 'created_at', 'updated_at']


# 🔹 2. Patient Write Serializer (for POST/PUT/PATCH)
class PatientWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            'id',
            'mrn',
            'first_name',
            'last_name',
            'date_of_birth',
            'gender',
            'blood_group',
            'phone',
            'email',
            'address',
            'mode_of_payment',
            'insurance',
            'discharged_time',
            'emergency_contact_name',
            'emergency_contact_phone',
            'notes',
        ]
        read_only_fields = ['mrn']


# 🔹 3. Main PatientSerializer – Switches between detail and write
class PatientSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    chronic_conditions = ChronicConditionSerializer(many=True, read_only=True)
    allergies = AllergySerializer(many=True, read_only=True)
    surgical_history = SurgicalHistorySerializer(many=True, read_only=True)
    family_history = FamilyHistorySerializer(many=True, read_only=True)

    def get_serializer_class(self):
        if self.context['request'].method in ['POST', 'PUT', 'PATCH']:
            return PatientWriteSerializer
        return PatientDetailSerializer

    class Meta:
        model = Patient
        fields = [
            'id',
            'mrn',
            'first_name',
            'last_name',
            'date_of_birth',
            'gender',
            'blood_group',
            'age',
            'phone',
            'email',
            'address',
            'mode_of_payment',
            'insurance',
            'discharged_time',
            'emergency_contact_name',
            'emergency_contact_phone',
            'notes',
            'created_at',
            'updated_at',
            # Medical History
            'chronic_conditions',
            'allergies',
            'surgical_history',
            'family_history',
        ]
        read_only_fields = ['mrn', 'created_at', 'updated_at']