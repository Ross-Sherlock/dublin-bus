from django.db import models

# Create your models here.
class Gtfsr(models.Model):
    update_time = models.DateTimeField(blank=True, primary_key=True)
    entity_id = models.IntegerField(blank=True, null=True)
    trip = models.JSONField(blank=True, null=True)
    stop_time_update = models.JSONField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gtfsr'