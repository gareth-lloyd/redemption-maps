from rest_framework import serializers

from routes import models as routes_models


class RouteAvailabilitySerializer(serializers.ModelSerializer):
    distance_miles = serializers.IntegerField(
        source='route.distance_miles'
    )
    class Meta:
        model = routes_models.RouteAvailability
        fields = (
            'day',
            'miles_cost',
            'is_peak',
            'cabin',
        )


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = routes_models.Location
        fields = (
            'name',
            'code',
            'type',
            'location',
            'is_origin',
        )


class RouteSerializer(serializers.ModelSerializer):
    origin = LocationSerializer()
    destination = LocationSerializer()

    class Meta:
        model = routes_models.Route
        fields = (
            'origin',
            'destination',
            'distance_miles',
        )


class AvailabilityDaySerializer(serializers.Serializer):
    day = serializers.DateField()
    available = serializers.BooleanField()


class CombinedRouteAvailabilitySerializer(serializers.Serializer):
    origin_code = serializers.CharField()
    destination_code = serializers.CharField()
    distance_miles = serializers.IntegerField(source='route.distance_miles')
    miles_cost = serializers.IntegerField()
    miles_cost_peak = serializers.IntegerField()
    availability = AvailabilityDaySerializer(many=True)
    inbound_availability = AvailabilityDaySerializer(many=True)


class SearchParamsSerializer(serializers.Serializer):
    origin_code = serializers.CharField()
    destination_code = serializers.CharField(required=False)
    cabin = serializers.CharField()
    n_passengers = serializers.IntegerField()
    outbound_start = serializers.DateField()
    outbound_end = serializers.DateField()
    inbound_start = serializers.DateField(required=False)
    inbound_end = serializers.DateField(required=False)
    avios = serializers.IntegerField(required=False)
