from rest_framework import serializers
from gtfsr.models import Gtfsr

class gtfsr_serializer(serializers.ModelSerializer):
    class Meta:
        model = Gtfsr
        fields = ('update_time', 'entity_id', 'trip', 'stop_time_update')