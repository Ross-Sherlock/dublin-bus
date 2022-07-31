from django.db import models

class ProportionsApril(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_april'


class ProportionsAugust(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID',  primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_august'


class ProportionsDecember(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_december'


class ProportionsFebruary(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_february'


class ProportionsJanuary(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_january'


class ProportionsJuly(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_july'


class ProportionsJune(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID',  primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_june'


class ProportionsMarch(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID',  primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_march'


class ProportionsMay(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_may'


class ProportionsNovember(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_november'


class ProportionsOctober(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_october'


class ProportionsSeptember(models.Model):
    lineid = models.TextField(db_column='LINEID', blank=True, null=True)  # Field name made lowercase.
    stoppointid = models.IntegerField(db_column='STOPPOINTID', primary_key=True)  # Field name made lowercase.
    proportion = models.FloatField(db_column='PROPORTION', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'proportions_september'


class Stops(models.Model):
    code = models.IntegerField(db_column='CODE', primary_key=True)  # Field name made lowercase.
    name = models.TextField(db_column='NAME', blank=True, null=True)  # Field name made lowercase.
    altname = models.TextField(db_column='ALTNAME', blank=True, null=True)  # Field name made lowercase.
    lat = models.FloatField(db_column='LAT', blank=True, null=True)  # Field name made lowercase.
    long = models.FloatField(db_column='LNG', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'stops'