from django.shortcuts import render

from django_filters import rest_framework
from rest_framework.generics import ListAPIView

from routes import (
    filters as routes_filters, models as routes_models,
    serializers as routes_serializers)


class AvailableRoutes(ListAPIView):
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_class = routes_filters.AvailableRoutesFilterSet
    queryset = routes_models.Route.objects.all()
    serializer_class = routes_serializers.RouteSerializer
