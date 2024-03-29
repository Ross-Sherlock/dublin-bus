# Generated by Django 4.0.6 on 2022-08-08 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='StaticStops',
            fields=[
                ('route_description', models.CharField(blank=True, max_length=50, primary_key=True, serialize=False)),
                ('startpoint', models.CharField(blank=True, max_length=25, null=True)),
                ('headsign', models.CharField(blank=True, max_length=25, null=True)),
                ('operator', models.CharField(blank=True, max_length=10, null=True)),
                ('route_name', models.CharField(blank=True, max_length=10, null=True)),
                ('direction', models.CharField(blank=True, max_length=4, null=True)),
                ('stops', models.JSONField(blank=True, null=True)),
            ],
            options={
                'db_table': 'static_stops',
                'ordering': ('route_name',),
                'managed': False,
            },
        ),
    ]
