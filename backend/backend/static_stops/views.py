# # from django.http import HttpResponse
# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from static_stops.models import StaticStops
from static_stops.serializers import static_stops_serializer
# Create your views here.

@csrf_exempt
def static_stops_api(request):
    if request.method == 'GET':
        static_stops_data = StaticStops.objects.all()
        static_stops_data_serializer = static_stops_serializer(static_stops_data, many=True)
        return JsonResponse(static_stops_data_serializer.data, safe=False)