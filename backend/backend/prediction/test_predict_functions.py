import prediction.views
from django.test import TestCase, Client
from django.urls import reverse
from prediction.models import ProportionsAugust
import json
import requests

class TestViews(TestCase):

    client = Client()
    pred = 0

    def test_nonexistent_route(self):
        # Url encoded for UCD to Trinity
        response = TestViews.client.get("/predict/?month=August&day=Monday&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=BOGUS&start_stopid=768&end_stopid=320&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data, "ERR")

    def test_complete_query(self):
        # Url encoded for UCD to Trinity
        response = TestViews.client.get("/predict/?month=August&day=Monday&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&start_stopid=768&end_stopid=320&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        TestViews.pred=data


    def test_no_start_stop(self):
        # Url encoded for UCD to Trinity with start stop id not provided
        response = TestViews.client.get("/predict/?month=August&day=Monday&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&end_stopid=320&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,TestViews.pred)

    def test_no_end_stop(self):
        # Url encoded for UCD to Trinity with no end stop id provided
        response = TestViews.client.get("/predict/?month=August&day=Monday&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&start_stopid=768&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,TestViews.pred)

    def test_no_start_or_end_stop(self):
        # Url encoded for UCD to Trinity with no start or stop id provided
        response = TestViews.client.get("/predict/?month=August&day=Monday&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,TestViews.pred)
    
    def test_no_month(self):
        # Url encoded for UCD to Trinity with no start or stop id provided
        response = TestViews.client.get("/predict/?day=Monday&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,"ERR")
    
    def test_no_day(self):
        # Url encoded for UCD to Trinity with no start or stop id provided
        response = TestViews.client.get("/predict/?month=August&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,"ERR")
    
    def test_no_hour(self):
        response = TestViews.client.get("/predict/?month=August&day=Monday&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&start_stopid=768&end_stopid=320&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,"ERR")
    
    def test_invalid_month(self):
        response = TestViews.client.get("/predict/?month=INVALIDMONTH&day=Monday&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&start_stopid=768&end_stopid=320&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,"ERR")
    
    def test_invalid_day(self):
        response = TestViews.client.get("/predict/?month=August&day=INVALIDDAY&hour=21&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&start_stopid=768&end_stopid=320&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,"ERR")
    
    def test_invalid_hour(self):
        response = TestViews.client.get("/predict/?month=August&day=Monday&hour=100&start_lat=53.3094124&start_lng=-6.218878399999999&end_lat=53.3456456&end_lng=-6.2593052&route_number=46A&start_stopid=768&end_stopid=320&n_stops=16")
        self.assertEquals(response.status_code, 200)
        data = response.json()
        self.assertEquals(data,"ERR")
