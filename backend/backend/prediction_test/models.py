from django.db import models

# Create your models here.

#==========  Table 'proportions' ========== #
class Proportions(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions'


#==========  Table 'stops' ========== #
class Stops(models.Model):
    code = models.IntegerField(db_column='CODE', primary_key=True)  # Field name made lowercase.
    name = models.TextField(db_column='NAME', blank=True, null=True)  # Field name made lowercase.
    altname = models.TextField(db_column='ALTNAME', blank=True, null=True)  # Field name made lowercase.
    lat = models.FloatField(db_column='LAT', blank=True, null=True)  # Field name made lowercase.
    long = models.FloatField(db_column='LONG', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stops'