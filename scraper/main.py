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
            # scrape weather data every 10 minutes
            if minute % 10 == 0:
                print("INFO: start weather_scraper")
                weather_scraper.insert_current_weather(result=weather_scraper.get_current_weather())
                print("INFO: end weather_scraper")
      except Exception as e:
            print("Error: error in main, message:", e)

      # sleep 50 sec
      time.sleep(50)