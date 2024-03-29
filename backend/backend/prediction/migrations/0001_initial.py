# Generated by Django 4.0.6 on 2022-08-08 10:37

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProportionsApril',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_april',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsAugust',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_august',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsDecember',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_december',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsFebruary',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_february',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsJanuary',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_january',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsJuly',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_july',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsJune',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_june',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsMarch',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_march',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsMay',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_may',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsNovember',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_november',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsOctober',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_october',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='ProportionsSeptember',
            fields=[
                ('lineid', models.TextField(blank=True, db_column='LINEID', null=True)),
                ('stoppointid', models.IntegerField(db_column='STOPPOINTID', primary_key=True, serialize=False)),
                ('proportion', models.FloatField(blank=True, db_column='PROPORTION', null=True)),
            ],
            options={
                'db_table': 'proportions_september',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Stops',
            fields=[
                ('code', models.IntegerField(db_column='CODE', primary_key=True, serialize=False)),
                ('name', models.TextField(blank=True, db_column='NAME', null=True)),
                ('altname', models.TextField(blank=True, db_column='ALTNAME', null=True)),
                ('lat', models.FloatField(blank=True, db_column='LAT', null=True)),
                ('long', models.FloatField(blank=True, db_column='LNG', null=True)),
            ],
            options={
                'db_table': 'stops',
                'managed': False,
            },
        ),
    ]
