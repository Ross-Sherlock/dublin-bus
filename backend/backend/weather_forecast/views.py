from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from weather_forecast.models import ForecastWeather
from weather_forecast.serializers import forecast_weather_serializer
# Create your views here.

@csrf_exempt
def forecast_weather_api(request):
    if request.method == 'GET':
        forecast_weather_data = ForecastWeather.objects.all()
        forecast_weather_data_serializer = forecast_weather_serializer(forecast_weather_data, many=True)
        return JsonResponse(forecast_weather_data_serializer.data, safe=False)