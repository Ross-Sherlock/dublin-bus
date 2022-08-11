from rest_framework import serializers
from weather_forecast.models import ForecastWeather

class forecast_weather_serializer(serializers.ModelSerializer):
    class Meta:
        model = ForecastWeather
        fields = ('date_time', 'temp', 'main', 'description', 'icon')