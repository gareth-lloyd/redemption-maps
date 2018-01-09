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
        return routes_filters.find_route_availabilities(**params)


class LocationsCities(ListAPIView):
    serializer_class = routes_serializers.LocationSerializer
    queryset = (
        routes_models.Location.objects.filter(
            type=routes_models.Location.CITY
        )
    )
