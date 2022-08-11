from DBconnect import DBconnect
import requests
import json
from datetime import datetime
import sys
# change sys path for importing
sys.path.append(sys.path[0].replace("scraper", "config/"))
from Config import Config

current_weather_api = "https://api.openweathermap.org/data/2.5/weather"
forecast_weather_api = "https://api.openweathermap.org/data/2.5/forecast/daily?"


class Weather:
    def __init__(self, config=Config()):
        self.config = config.load()  # load the configs from config.txt, this is a dict

        self.appid = self.config['openweather_apikey']
        self.current_params = {
            "lat": 53.34767248677168,
            "lon": -6.25922960937505,
            "units": "metric",
            "appid": self.appid
        }
        self.forecast_params = {
            "lat": 53.34767248677168,
            "lon": -6.25922960937505,
            "cnt": 5,
            "units": "metric",
            "appid": self.appid
        }

    def get_current_weather(self):
        response = requests.get(current_weather_api,
                                params=self.current_params).text
        result = json.loads(response)
        return result  # this result is in json format

    def get_forecast_weather(self):
        response = requests.get(forecast_weather_api,
                                params=self.forecast_params).text
        total_result = json.loads(response)
        print(total_result)
        result = total_result["list"]
        return result  # this result is in json format

    def create_table(self):
        engine = DBconnect(Config()).engine()

        # create the table for current weather data
        sql1 = "CREATE TABLE IF NOT EXISTS current_weather (date_time DATETIME, temp FLOAT, main VARCHAR(25), description VARCHAR(25), icon VARCHAR(25));"

        sql2 = "CREATE TABLE IF NOT EXISTS forecast_weather (date_time DATETIME, temp FLOAT, main VARCHAR(25), description VARCHAR(25), icon VARCHAR(25));"

        #execute sql
        try:
            print("creating table current_weather ...")
            engine.execute(sql1)
            print("creating table forecast_weather...")
            engine.execute(sql2)
        except Exception as e:
            print(e)

    def insert_current_weather(self, result):
        engine = DBconnect(Config()).engine()

        date_time = datetime.fromtimestamp(int(result["dt"])).strftime(
            '%Y-%m-%d %H:%M:%S')  # convert unix time to datetime
        temp = result["main"]["temp"]
        main = result["weather"][0]["main"]
        description = result["weather"][0]["description"]
        icon = result["weather"][0]["icon"]
        values = (date_time, temp, main, description, icon)

        engine.execute("DELETE FROM current_weather;")
        engine.execute(
            "INSERT INTO current_weather (date_time, temp, main, description, icon) VALUES (%s, %s, %s, %s, %s)", values
        )

    def insert_forecast_weather(self, result):
      engine = DBconnect(Config()).engine()
      engine.execute("DELETE FROM forecast_weather;")

      for forecast in result:
        date_time = datetime.fromtimestamp(int(forecast["dt"])).strftime(
          '%Y-%m-%d %H:%M:%S')  # convert unix time to datetime
        temp = forecast["temp"]["day"]
        main = forecast["weather"][0]["main"]
        description = forecast["weather"][0]["description"]
        icon = forecast["weather"][0]["icon"]
        values = (date_time, temp, main, description, icon)

        engine.execute(
            "INSERT INTO forecast_weather (date_time, temp, main, description, icon) VALUES (%s, %s, %s, %s, %s)", values
        )