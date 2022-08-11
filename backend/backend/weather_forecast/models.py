from django.db import models

# Create your models here.
class ForecastWeather(models.Model):
    date_time = models.DateTimeField(blank=True, primary_key=True)
    temp = models.FloatField(blank=True, null=True)
    main = models.CharField(max_length=25, blank=True, null=True)
    description = models.CharField(max_length=25, blank=True, null=True)
    icon = models.CharField(max_length=25, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'forecast_weather'