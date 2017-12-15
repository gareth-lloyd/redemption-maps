from django.shortcuts import render

from django_filters import rest_framework
from rest_framework.generics import ListAPIView

from routes import (
    filters as routes_filters, models as routes_models,
    serializers as routes_serializers)


class AvailableRoutes(ListAPIView):
    serializer_class = routes_serializers.CombinedRouteAvailabilitySerializer

    def get_params(self):
        serializer = routes_serializers.SearchParamsSerializer(
            data=self.request.query_params
        )
        if serializer.is_valid(raise_exception=True):
            return serializer.validated_data

    def get_queryset(self):
        params = self.get_params()
        values = []
        for route, availability in (
            routes_filters.routes_with_availability(**params)
        ):
            origin = route.origin.code
            destination = route.destination.code
            values.append(dict(
                availability=availability, origin_code=origin,
                destination_code=destination,
            ))
        return values


class DestinationCities(ListAPIView):
    serializer_class = routes_serializers.LocationSerializer
    queryset = (
        routes_models.Location.objects.filter(type=routes_models.Location.CITY)
    )


class OriginCities(ListAPIView):
    serializer_class = routes_serializers.LocationSerializer
    queryset = (
        routes_models.Location.objects.filter(
            type=routes_models.Location.CITY, is_origin=True
        )
    )
