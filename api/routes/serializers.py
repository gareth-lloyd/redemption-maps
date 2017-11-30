from rest_framework.serializers import ModelSerializer

from routes import models as routes_models


class RouteAvailabilitySerializer(ModelSerializer):
    class Meta:
        model = routes_models.RouteAvailability
        fields = (
            'day',
            'miles_cost',
            'cabin',
        )


class LocationSerializer(ModelSerializer):
    class Meta:
        model = routes_models.Location
        fields = (
            'name',
            'code',
            'type',
        )


class RouteSerializer(ModelSerializer):
    origin = LocationSerializer()
    destination = LocationSerializer()
    availability = RouteAvailabilitySerializer(many=True)

    class Meta:
        model = routes_models.Route
        fields = (
            'origin',
            'destination',
            'availability',
        )
