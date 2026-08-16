from rest_framework import serializers
from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application

        fields = [
            'id',
            'company',
            'role',
            'status',
            'date_applied',
            'owner',
        ]

        read_only_fields = ['id', 'owner']