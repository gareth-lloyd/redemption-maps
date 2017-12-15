from rest_framework import serializers

from routes import models as routes_models


class RouteAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = routes_models.RouteAvailability
        fields = (
            'day',
            'miles_cost',
            'cabin',
        )


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = routes_models.Location
        fields = (
            'name',
            'code',
            'type',
            'location'
        )


class RouteSerializer(serializers.ModelSerializer):
    origin = LocationSerializer()
    destination = LocationSerializer()

    class Meta:
        model = routes_models.Route
        fields = (
            'origin',
            'destination',
        )


class AvailabilityDaySerializer(serializers.Serializer):
    day = serializers.DateField()
    available = serializers.BooleanField()


class CombinedRouteAvailabilitySerializer(serializers.Serializer):
    origin_code = serializers.CharField()
    destination_code = serializers.CharField()
    availability = AvailabilityDaySerializer(many=True)


class SearchParamsSerializer(serializers.Serializer):
    origin_code = serializers.CharField()
    destination_code = serializers.CharField(required=False)
    cabin = serializers.CharField()
    n_passengers = serializers.IntegerField()
    when_start = serializers.DateField()
    when_end = serializers.DateField()
