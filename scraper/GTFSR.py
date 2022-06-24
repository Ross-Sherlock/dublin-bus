from tkinter import E
from tracemalloc import stop
import requests
import json
from datetime import datetime
import sys
sys.path.append(sys.path[0].replace("scraper", "config/"))  #change sys path for importing
from Config import Config
from DBconnect import DBconnect


gtfsr_api = "https://api.nationaltransport.ie/gtfsr/v1"

class GTFSR():
    def __init__(self, config=Config(), db=DBconnect(Config())):
        self.config = config.load() #load the configs from config.txt, this is a dict
        self.engine = db.engine()

        self.x_api_key = self.config["gtfsr_apikey"]
        self.params = {
            "format": "json"
        }
        self.headers = {
            'Cache-Control': 'no-cache',
            'x-api-key': self.x_api_key
        }

    def get_gtfs(self):
        """HTTP GET request to GTFS-R API to get latest bus info, return as json"""

        response = requests.get(gtfsr_api, params=a.params, headers=a.headers).text
        result = json.loads(response)
        return result

    def create_table(self):
        """Create the table for real-time bus data """
        
        sql1 = """
        CREATE TABLE IF NOT EXISTS gtfsr 
        (
            update_time DATETIME,
            entity_id INT, 
            trip JSON, 
            stop_time_update JSON
        );
        """

        #execute sql
        try:
            print("creating table gtfsr ...")
            self.engine.execute(sql1)
        except Exception as e:
            print(e)

    def insert_gtfsr(self, result):
        """Insert GTFS-Realtime data into database"""

        self.engine.execute("DELETE FROM gtfsr;")

        update_time = datetime.fromtimestamp(int(result["Header"]["Timestamp"])).strftime('%Y-%m-%d %H:%M:%S')  #convert unix time to datetime

        Entity = result["Entity"]  #it is a list with hundreds/thousands lines of bus data
        print("len of Entity is:", len(Entity))
        for i in range(len(Entity)):
            print(i)
            entity_id = i
            trip_update = Entity[i]["TripUpdate"]
            trip = json.dumps(trip_update["Trip"])
            if "StopTimeUpdate" in trip_update:
                stop_time_update = json.dumps(trip_update["StopTimeUpdate"])
            else:
                stop_time_update = json.dumps("{}")
            values = (update_time, entity_id, trip, stop_time_update)

            self.engine.execute(
                "INSERT INTO gtfsr (update_time, entity_id, trip, stop_time_update) VALUES (%s, %s, %s, %s)", values
            )


a = GTFSR()
a.create_table()
a.insert_gtfsr(result = a.get_gtfs())