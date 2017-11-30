from django_filters import rest_framework as filters

from routes import models as routes_models


def routes_with_availability(
    origin_code, cabin, when_start, when_end, n_passengers
):
    seat_field = routes_models.RouteAvailability.seat_field_name(n_passengers)
    route_id_days = (
        routes_models.RouteAvailability.objects
        .filter(
            route__origin__code=origin_code,
            cabin=cabin,
            day__range=(when_start, when_end),
            **{seat_field: True}
        )
        .order_by('day')
        .values_list('route', 'day')
    )

    days_by_route_id = {}
    for route_id, day in route_id_days:
        days_by_route_id.setdefault(route_id, []).append(day)

    routes = routes_models.Route.objects.filter(id__in=days_by_route_id.keys())
    return {
        route: days_by_route_id.get(route.id)
        for route in routes
    }


class AvailableRoutesFilterSet(filters.FilterSet):
    cabin = filters.CharFilter(
        name='availability', lookup_expr='cabin'
    )
    origin_code = filters.CharFilter(
        name='origin',
        lookup_expr='code',
        distinct=True
    )
    when = filters.DateRangeFilter(method='filter_availability')

    class Meta:
        model = routes_models.Route
        fields = [
        ]

    def filter_availability(self, queryset, name, value):
        print(value)
        return queryset
