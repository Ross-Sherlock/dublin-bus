from typing import final
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from numpy import number
from prediction.models import *
from prediction.logic_test import Predict

@csrf_exempt
def handleRequest(request):
  """
    This function read the query string from frontend
    And return prediction value to the frontend
  """
  if request.method == 'GET':
    start_lat = request.GET.get('start_lat')
    print("debug:", start_lat)
    start_lng = request.GET.get('start_lng')
    end_lat = request.GET.get('end_lat')
    end_lng = request.GET.get('end_lng')
    route_number = request.GET.get('route_number')
    month = request.GET.get('month') #start with upper case
    day = request.GET.get('day')
    hour = request.GET.get('hour')
    start_stopid = request.GET.get('start_stopid')
    end_stopid = request.GET.get('end_stopid')
    n_stops = request.GET.get('n_stops')
    print("START STOPID:", start_stopid, "\nEND STOPID:", end_stopid)


    def get_stop_code(lat, lng, partial_lineid, **kwargs):
      lat = round(float(lat),4)
      lng = round(float(lng),3)
      """
        A function that will use lat,lng to query the 'stops' database to get a stop code
        Or if the query from frontend contains exact stop code, return it
      """
      for key in kwargs.keys():
        if key == "start_stopid" and not isinstance(kwargs["start_stopid"], type(None)):
          print("start_stopid PROVIDED!", kwargs["start_stopid"])
          return kwargs["start_stopid"]
        elif key == "end_stopid" and not isinstance(kwargs["end_stopid"], type(None)):
          print("end_stopid PROVIDED!", kwargs["end_stopid"])
          return kwargs["end_stopid"]
        else:

          query = """
          SELECT * FROM dublinbus.proportions_august 
          join dublinbus.stops ON stops.CODE=proportions_august.STOPPOINTID 
          where LINEID like "{lineid}\_%%" and 
          ABS(LAT - {lat})<0.0001 and ABS(LNG-{lng})<0.001
          """.format(lat=lat, lng=lng, lineid=partial_lineid)
          print("Using query2 to obtain stop number")
          # If no stop found, stop code = -1
          stop_code = -1
          for result in Stops.objects.raw(query):
            stop_code = result.code
          print("FROM get_stop_code METHOD:", stop_code)
          return stop_code

    def get_route_and_prop(stop_code, route_number, month):
      """
        A function that will take a stop code, then combine  with route_number
        query database 'proportions'
        finally find the correct proportion&route with direction
      """
      results = []
      query = """
      SELECT * FROM dublinbus.proportions_{month}
      where STOPPOINTID={stop_code} AND LINEID LIKE '{route_number}\_%%';	
      """.format(month=month.lower(), stop_code=stop_code, route_number=route_number)
      proportions = "Proportions" + month
      print("FOUND PROP TABLE:", proportions)
      for result in eval(proportions).objects.raw(query):   
        temp_dict = {}
        temp_dict["route"] = result.lineid
        temp_dict["proportion"] = result.proportion
        results.append(temp_dict)
      print("FROM get_route_and_prop METOHD:\n", results, "\n============")
      return results
    
    def get_nth_proportion(known_route_num, month, prop, number_of_stops, asc=True):
      """
      Used when only a start or end stop individually can be identified.
      This function will take the known stop and return the proportion of the stop n stops away.
      Number of stops n is provided by Google in the API response
      """
      if asc:
        order = "ASC"
        sign = ">"
      else:
        order="DESC"
        sign="<"
      print("ROUTE NUM", known_route_num)
      print("month", month)
      print("prop", prop)
      print("number_of_stops", number_of_stops)
      results = []
      query = """SELECT * FROM dublinbus.proportions_{month} where LINEID='{known_route_num}' and PROPORTION{sign}={prop} ORDER BY PROPORTION {order} LIMIT {number_of_stops},1;""".format(month=month.lower(), known_route_num=known_route_num, prop=prop, number_of_stops=number_of_stops, order=order, sign=sign)
      proportions = "Proportions" + month
      print("FOUND PROP TABLE:", proportions)
      for result in eval(proportions).objects.raw(query):   
        temp_dict = {}
        temp_dict["route"] = result.lineid
        temp_dict["proportion"] = result.proportion
        results.append(temp_dict)
      print("FROM get_route_and_prop METOHD:\n", results, "\n============")
      return results


    def final_check():
      """
        A function that checks whether there are multiple directions sharing a same stop id
        Return the correct route & direction by matching results of start stop and end stop
      """
      final_result = {}
      start = get_route_and_prop(stop_code=get_stop_code(start_lat, start_lng, route_number, start_stopid=start_stopid), route_number=route_number, month=month)
      end = get_route_and_prop(stop_code=get_stop_code(end_lat, end_lng, route_number, end_stopid=end_stopid), route_number=route_number, month=month)

      if len(start) == 1 and len(end) == 1 and start[0]["route"] == end[0]["route"]:
        final_result["route"] = start[0]["route"]
        final_result["depart_prop"] = start[0]["proportion"]
        final_result["arrival_prop"] = end[0]["proportion"]
        print("final result:\n", final_result)
      
      elif len(start) == 1 and len(end) == 0:
        known_route=start[0]["route"]
        prop = start[0]["proportion"]
        end = get_nth_proportion(known_route, month, prop, n_stops, True)
        final_result["route"] = start[0]["route"]
        final_result["depart_prop"] = start[0]["proportion"]
        final_result["arrival_prop"] = end[0]["proportion"]
      
      elif len(start) == 0 and len(end) == 1:
        known_route=start[0]["route"]
        prop = end[0]["proportion"]
        start = get_nth_proportion(known_route, month, prop, n_stops, False)
        final_result["route"] = start[0]["route"]
        final_result["depart_prop"] = start[0]["proportion"]
        final_result["arrival_prop"] = end[0]["proportion"]

      elif (len(start)==1 and len(end) > 1):

        correct_end = []
        for item in end:
          if item["route"] == start[0]["route"]:
            correct_end.append(item)
            final_result = {}
            final_result["route"] = start[0]["route"]
            final_result["depart_prop"] = start[0]["proportion"]
            final_result["arrival_prop"] = correct_end[0]["proportion"]
            break
          else:
            final_result = "Cannot match any data!"
        print("final result:\n", final_result)

      elif (len(start) > 1 and len(end)==1):
        correct_start = []
        for item in start:
          if item["route"] == end[0]["route"]:
            correct_start.append(item)
            final_result = {}
            final_result["route"] = end[0]["route"]
            final_result["depart_prop"] = correct_start[0]["proportion"]
            final_result["arrival_prop"] = end[0]["proportion"]
            break
          else:
            final_result = "Cannot match any data!"
        print("final result:\n", final_result)

      else:
        final_result = "Cannot match any data!"
        print(final_result)
      return final_result

    def predict():
      predict_result = "Cannot match any data!"
      params = final_check()
      if isinstance(params, dict):
        route = params["route"]
        depart_prop = params["depart_prop"]
        arrival_prop = params["arrival_prop"]
        predict = Predict(month, day, hour, route, depart_prop, arrival_prop)
        predict_result = predict.get_prediction()
        predict_result=int(predict_result)
      return predict_result
     
    if isinstance(predict(), str):
      message = "ERR"

    elif isinstance(predict(), int):
        message = f"{round(predict()/60,1)}"
    else:
      message = f"{round(predict()[0]/60,1)}"

    return JsonResponse(message, safe=False)