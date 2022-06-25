# # from django.http import HttpResponse
# from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from gtfsr.models import Gtfsr
from gtfsr.serializers import gtfsr_serializer
# Create your views here.

@csrf_exempt
def gtfsr_api(request):
    if request.method == 'GET':
        gtfsr_data = Gtfsr.objects.all()
        gtfsr_data_serializer = gtfsr_serializer(gtfsr_data, many=True)
        return JsonResponse(gtfsr_data_serializer.data, safe=False)