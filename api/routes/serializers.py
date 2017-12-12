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


class CombinedRouteAvailabilitySerializer(serializers.Serializer):
    route = RouteSerializer()
    availability = serializers.ListField(
        child=serializers.DateField()
    )


class SearchParamsSerializer(serializers.Serializer):
    origin_code = serializers.CharField()
    destination_code = serializers.CharField(required=False)
    cabin = serializers.CharField()
    n_passengers = serializers.IntegerField()
    when_start = serializers.DateField()
    when_end = serializers.DateField()
