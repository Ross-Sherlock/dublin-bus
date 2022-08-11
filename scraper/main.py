import time
from datetime import datetime
from Weather import Weather

if __name__ == "__main__":
  weather_scraper = Weather()
  weather_scraper.create_table()
  while True:
      now = datetime.now()
      print("main: now is", now)
      minute = now.minute
      try:
            # scrape current weather data every 10 minutes
            if minute % 10 == 0:
                print("INFO: start current weather scraper")
                weather_scraper.insert_current_weather(result=weather_scraper.get_current_weather())
                print("INFO: end current weather scraper")
            # scrape forecast weather data every 16 minutes
            if minute % 15 == 0:
                print("INFO: start forecast weather scraper")
                weather_scraper.insert_forecast_weather(result=weather_scraper.get_forecast_weather())
                print("INFO: end forecast weather scraper")
      except Exception as e:
            print("Error: error in main, message:", e)

      # sleep 60 sec
      time.sleep(60)