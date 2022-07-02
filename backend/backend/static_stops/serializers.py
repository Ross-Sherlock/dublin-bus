from rest_framework import serializers
from static_stops.models import StaticStops

class static_stops_serializer(serializers.ModelSerializer):
    class Meta:
        model = StaticStops
        fields = ('route_description', 'startpoint', 'headsign', 'operator', 'route_name', 'direction', 'stops')