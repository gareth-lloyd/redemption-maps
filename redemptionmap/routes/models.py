from django.contrib.gis.db import models


class Airline(models.Model):
    name = models.CharField(max_length=64, unique=True)
    loyalty_scheme_name = models.CharField(max_length=32)


class Location(models.Model):
    CITY = 'CITY'
    REGION = 'REGION'
    AIRPORT = 'AIRPORT'
    COUNTRY = 'COUNTRY'
    name = models.CharField(max_length=128)
    code = models.CharField(max_length=8)
    type = models.CharField(max_length=16, db_index=True)
    parent = models.ForeignKey(
        'self', blank=True, null=True, related_name='children',
    )
    location = models.PointField(blank=True, null=True)

    class Meta:
        unique_together = ('code', 'type')


class Route(models.Model):
    origin = models.ForeignKey(
        Location, related_name='routes', on_delete=models.PROTECT
    )
    destination = models.ForeignKey(
        Location, related_name='inbound_routes', on_delete=models.PROTECT
    )
    airline = models.ForeignKey(Airline, on_delete=models.PROTECT)

    class Meta:
        unique_together = ('origin', 'destination', 'airline')


class RouteAvailability(models.Model):
    updated = models.DateTimeField(auto_now=True)
    route = models.ForeignKey(Route, on_delete=models.PROTECT)
    day = models.DateField()
    miles_cost = models.IntegerField(blank=True, null=True)
    cabin = models.CharField(max_length=16)

    # You can't ask the API "how many seats are available?"
    # but instead "Are there three seats available, yes or no?"
    seats_available_1 = models.BooleanField(default=False)
    seats_available_2 = models.BooleanField(default=False)
    seats_available_3 = models.BooleanField(default=False)
    seats_available_4 = models.BooleanField(default=False)

    class Meta:
        unique_together = ('route', 'day', 'cabin')
