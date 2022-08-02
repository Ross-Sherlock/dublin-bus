from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from prediction_test.models import *
from prediction_test.logic_test import Predict

@csrf_exempt
def test(request):
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
    print("START STOPID:", start_stopid, "\nEND STOPID:", end_stopid)


    def get_stop_code(lat, lng, **kwargs):
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

    def get_route_and_prop(stop_code, route_number, month):
      """
        A function that will take a stop code, then combine  with route_number
        query database 'proportions'
        finally find the correct proportion&route with direction
      """
      results = []
      query = """
      SELECT * FROM dublinbus.proportions_{month}
      where STOPPOINTID={stop_code} AND LINEID LIKE '%%{route_number}%%';	
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

    def final_check():
      """
        A function that checks whether there are multiple directions sharing a same stop id
        Return the correct route & direction by matching results of start stop and end stop
      """
      final_result = {}
      start = get_route_and_prop(stop_code=get_stop_code(start_lat, start_lng, start_stopid=start_stopid), route_number=route_number, month=month)
      end = get_route_and_prop(stop_code=get_stop_code(end_lat, end_lng, end_stopid=end_stopid), route_number=route_number, month=month)

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
      return predict_result
    
    if isinstance(predict(), str):
      message = "Prediction result is: {}".format(predict())
    else:
      message = "Prediction result is: {}".format(predict()[0])

    return JsonResponse(message, safe=False)