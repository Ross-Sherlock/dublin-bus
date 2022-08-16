# # from django.http import HttpResponse
# from django.shortcuts import render
import json
import mysql.connector
import sys
sys.path.append(sys.path[0].replace("backend/backend", "config/"))  #change sys path for importing
from Config import Config  #now path is config, from Config.py import Config
db_config = Config()  #new a Class instance
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from static_stops.models import StaticStops
# Create your views here.


@csrf_exempt
def static_stops_api(request):
    if request.method == 'GET':
        route_name = request.GET.get("route_name")
        route_des = request.GET.get("route_des")
        print("RECEIVED ROUTE NAME:", route_name)
        print("RECEIVED ROUTE DESCRIPTION:", type(route_des))

        def get_route_descriptions(route_name):
            results = {}
            query = """
                SELECT route_description FROM dublinbus.static_stops
                where route_name = "{route_name}";
                """.format(route_name=route_name)
            print(query)
            i = 0
            for result in StaticStops.objects.raw(query):
                results[i] = result.route_description
                i += 1
            print("FOUND DESCRIPTIONS:", results)
            return results

        def get_all_stops(route_des):

            mydb = mysql.connector.connect(
                host=db_config.load()['URL'],
                user=db_config.load()['USER'],
                password=db_config.load()['PASSWORD'],
                database=db_config.load()['DB']
            )
            mycursor = mydb.cursor()
            query = f"""
                SELECT stops FROM dublinbus.static_stops
                WHERE route_description = "{route_des}";
            """
            print(query)
            mycursor.execute(query)
            myresult = mycursor.fetchall()
            return myresult[0][0]


        if not isinstance(route_name, type(None)):
            print("USING NAME FINDING DES...")
            response = get_route_descriptions(route_name=route_name)
        elif not isinstance(route_des, type(None)):
            print("USING DES FINDING STOPS...")
            response = json.loads(get_all_stops(route_des))
        else:
            response = ""

        return JsonResponse(response, safe=False)
