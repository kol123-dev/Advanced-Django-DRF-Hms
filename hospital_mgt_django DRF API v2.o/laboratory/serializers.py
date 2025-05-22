from rest_framework import serializers
from .models import LabTestCategory, LabTestType, LabResultAttachment
from visits.models import LabTestOrder
from users.models import User
from patients.models import Patient
from users.serializers import UserSerializer
from patients.serializers import PatientSerializer


# ┌──────────────────────────────┐
# │ 1. LabTestCategory Serializers │
# └──────────────────────────────┘

class LabTestCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTestCategory
        fields = ['id', 'name', 'description']


class LabTestCategoryWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTestCategory
        fields = ['id', 'name', 'description']

    def validate_name(self, value):
        if LabTestCategory.objects.filter(name__iexact=value).exists():
            raise serializers.ValidationError("A category with this name already exists.")
        return value


# ┌──────────────────────────────┐
# │ 2. LabTestType Serializers     │
# └──────────────────────────────┘

class LabTestTypeSerializer(serializers.ModelSerializer):
    category = LabTestCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=LabTestCategory.objects.all(),
        source='category',
        allow_null=True,
        required=False
    )

    class Meta:
        model = LabTestType
        fields = ['id', 'name', 'description', 'category', 'category_id']


class LabTestTypeWriteSerializer(serializers.ModelSerializer):
    category = LabTestCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=LabTestCategory.objects.all(),
        source='category',
        allow_null=True,
        required=False
    )

    class Meta:
        model = LabTestType
        fields = ['id', 'name', 'description', 'category', 'category_id']

    def validate_name(self, value):
        existing = LabTestType.objects.filter(name__iexact=value)
        if self.instance:
            existing = existing.exclude(pk=self.instance.pk)
        if existing.exists():
            raise serializers.ValidationError("A test type with this name already exists.")
        return value


# ┌──────────────────────────────┐
# │ 3. LabTestOrder Serializers   │
# └──────────────────────────────┘

class LabTestOrderSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    patient_id = serializers.PrimaryKeyRelatedField(
        queryset=Patient.objects.all(),
        source='patient',
        required=True
    )
    test_type = LabTestTypeSerializer(read_only=True)
    test_type_id = serializers.PrimaryKeyRelatedField(
        queryset=LabTestType.objects.all(),
        source='test_type',
        required=True
    )
    requested_by = UserSerializer(read_only=True)
    requested_by_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='ordered_by',
        required=True
    )

    class Meta:
        model = LabTestOrder
        fields = [
            'id',
            'patient',
            'patient_id',
            'test_type',
            'test_type_id',
            'visit',
            'requested_by',
            'requested_by_id',
            'priority',
            'status',
            'ordered_at',
            'estimated_completion_time',
            'completed_at',
            'result',
            'notes'
        ]
        read_only_fields = ['ordered_at', 'completed_at']


class LabTestOrderWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabTestOrder
        fields = [
            'id',
            'patient',
            'test_type',
            'visit',
            'ordered_by',
            'priority',
            'status',
            'estimated_completion_time',
            'result',
            'notes'
        ]
        extra_kwargs = {
            'patient': {'required': True},
            'test_type': {'required': True},
            'ordered_by': {'required': True}
        }

    def validate(self, data):
        # Ensure status flows correctly
        if data.get('status') == 'completed' and not data.get('completed_at'):
            data['completed_at'] = serializers.CurrentUserDefault()
        return super().validate(data)


# ┌───────────────────────────────────┐
# │ 4. LabResultAttachment Serializers │
# └───────────────────────────────────┘

class LabResultAttachmentSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = LabResultAttachment
        fields = ['id', 'lab_order', 'file', 'file_url', 'uploaded_by', 'uploaded_at']
    
    def get_file_url(self, obj):
        request = self.context.get('request')
        if obj.file and hasattr(obj.file, 'url'):
            return request.build_absolute_uri(obj.file.url)
        return None


class LabResultAttachmentWriteSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = LabResultAttachment
        fields = ['id', 'lab_order', 'file', 'uploaded_by', 'uploaded_at']
        read_only_fields = ['uploaded_at']


# ┌──────────────────────────────┐
# │ 5. Optional: Combined View  │
# └──────────────────────────────┘

class LabTestOrderDetailSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    test_type = LabTestTypeSerializer(read_only=True)
    requested_by = UserSerializer(source='ordered_by', read_only=True)
    attachments = LabResultAttachmentSerializer(many=True, read_only=True)

    class Meta:
        model = LabTestOrder
        fields = [
            'id',
            'patient',
            'test_type',
            'visit',
            'requested_by',
            'priority',
            'status',
            'ordered_at',
            'estimated_completion_time',
            'completed_at',
            'result',
            'notes',
            'attachments'
        ]