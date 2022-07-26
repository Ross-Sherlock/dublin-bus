from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from prediction_test.models import Proportions, Stops
from prediction_test.logic_test import Predict

@csrf_exempt
def test(request):
  """
    This function read the query string from frontend
    And return prediction value to the frontend
  """
  if request.method == 'GET':
    start_lat = float(request.GET.get('start_lat'))
    start_lng = float(request.GET.get('start_lng'))
    end_lat = float(request.GET.get('end_lat'))
    end_lng = float(request.GET.get('end_lng'))
    route_number = request.GET.get('route_number')
    month = request.GET.get('month')
    day = request.GET.get('day')
    hour = request.GET.get('hour')

    message = "Hello I am testing start cord: {}, end cord: {}, number: {}!".format((start_lat, start_lng), (end_lat, end_lng), route_number)

    def get_stop_code(lat, lng):
      """
        A function that will use lat,lng to query the 'stops' database to get a stop code
      """
      query = """
        SELECT 
        *, 
        (
          3959 *
          acos(cos(radians({lat})) * 
          cos(radians(LAT)) * 
          cos(radians(LNG) - 
          radians({lng})) + 
          sin(radians({lat})) * 
          sin(radians(LAT)))
        ) AS distance 
        FROM dublinbus.stops
        HAVING distance < 28 
        ORDER BY distance LIMIT 1;
      """.format(lat=lat, lng=lng)
      for result in Stops.objects.raw(query):
        stop_code = result.code
      print("FROM get_stop_code METHOD:", stop_code)
      return stop_code

    def get_route_and_prop(stop_code, route_number):
      """
        A function that will take a stop code, then combine  with route_number
        query database 'proportions'
        finally find the correct proportion&route with direction
      """
      results = []
      query = """
      SELECT * FROM dublinbus.proportions
      where STOPPOINTID={stop_code} AND LINEID LIKE '%%{route_number}%%';	
      """.format(stop_code=stop_code, route_number=route_number)
      for result in Proportions.objects.raw(query):
        temp_dict = {}
        temp_dict["route"] = result.lineid
        temp_dict["proportion"] = result.proportion
        results.append(temp_dict)
      print("FROM get_route_and_prop METOHD:\n", results)
      return results

    def final_check():
      """
        A function that checks whether there are multiple directions sharing a same stop id
        Return the correct route & direction by matching results of start stop and end stop
      """
      final_result = {}
      start = get_route_and_prop(stop_code=get_stop_code(start_lat, start_lng), route_number=route_number)
      end = get_route_and_prop(stop_code=get_stop_code(end_lat, end_lng), route_number=route_number)

      if len(start) == 1 and len(end) == 1 and start[0]["route"] == end[0]["route"]:
        final_result["route"] = start[0]["route"]
        final_result["depart_prop"] = start[0]["proportion"]
        final_result["arrival_prop"] = end[0]["proportion"]
        print("final result:\n", final_result)

      elif (len(start)==1 and len(end) > 1):
        correct_end = []
        for item in end:
          if item["route"] == start[0]["route"]:
            correct_end.append(item)
            break
        final_result["route"] = start[0]["route"]
        final_result["depart_prop"] = start[0]["proportion"]
        final_result["arrival_prop"] = correct_end[0]["proportion"]
        print("final result:\n", final_result)

      elif (len(start) > 1 and len(end)==1):
        correct_start = []
        for item in start:
          if item["route"] == end[0]["route"]:
            correct_start.append(item)
            break
        final_result["route"] = end[0]["route"]
        final_result["depart_prop"] = correct_start[0]["proportion"]
        final_result["arrival_prop"] = end[0]["proportion"]
        print("final result:\n", final_result)

      else:
        final_result = "Cannot match any data!\n -both start and end stop have multiple directions\n -or cannot find any stops on this route"
        print(final_result)
      return final_result

    def predict():
      predict_result = "Cannot match any data!\n -both start and end stop have multiple directions\n -or cannot find any stops on this route"
      params = final_check()
      if isinstance(params, dict):
        route = params["route"]
        depart_prop = params["depart_prop"]
        arrival_prop = params["arrival_prop"]
        predict_model = Predict(month, day, hour, route, depart_prop, arrival_prop)
        predict_result = predict_model.get_prediction()
      return predict_result
    
    message = "Prediction for trip: from ({}, {}) to ({}, {}), bus number:{},  month:{}, day:{}, hour:{}, is:{} sec".format(start_lat, start_lng, end_lat, end_lng, route_number, month, day, hour, predict()[0])

    return JsonResponse(message, safe=False)