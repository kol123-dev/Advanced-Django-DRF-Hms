# queues/serializers.py
from rest_framework import serializers
from .models import Que
from users.serializers import UserSerializer
from visits.serializers import VisitDetailSerializer

class QueSerializer(serializers.ModelSerializer):
    visit = VisitDetailSerializer(read_only=True)  # ✅ This now includes patient  , embedding the visit
    assigned_to = UserSerializer(read_only=True)

    class Meta:
        model = Que
        fields = [
            'id',
            'visit',
            'department',
            'assigned_to',
            'priority',
            'status',
            'arrival_time',
            'start_time',
            'end_time',
            'notes'
        ]
        read_only_fields = ['visit', 'arrival_time']


class QueWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Que
        fields = [
            'visit',
            'department',
            'assigned_to',
            'priority',
            'status',
            'notes'
        ]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # Make visit read-only during update
        if self.instance:  # This means it's an update (PATCH/PUT)
            self.fields['visit'].read_only = True