from django.db import models

# Create your models here.
class StaticStops(models.Model):
    route_description = models.CharField(max_length=50, blank=True, primary_key=True)
    startpoint = models.CharField(max_length=25, blank=True, null=True)
    headsign = models.CharField(max_length=25, blank=True, null=True)
    operator = models.CharField(max_length=10, blank=True, null=True)
    route_name = models.CharField(max_length=10, blank=True, null=True)
    direction = models.CharField(max_length=4, blank=True, null=True)
    stops = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'static_stops'
        ordering = ("route_name",)