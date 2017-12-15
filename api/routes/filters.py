from django_filters import rest_framework as filters

from infrastructure.date_util import day_iterator_inclusive
from routes import models as routes_models


def _fill_out(when_start, when_end, available_days):
    available_days = set(available_days)
    dicts = [
        dict(day=day, available=day in available_days)
        for day in day_iterator_inclusive(when_start, when_end)
    ]
    return dicts


def routes_with_availability(
    origin_code, cabin, when_start, when_end, n_passengers,
    destination_code=None
):
    seat_field = routes_models.RouteAvailability.seat_field_name(n_passengers)
    filter_kwargs = dict(
        route__origin__code=origin_code,
        cabin=cabin,
        day__range=(when_start, when_end),
        **{seat_field: True}
    )
    if destination_code:
        filter_kwargs['route__destination__code'] = destination_code

    route_id_days = (
        routes_models.RouteAvailability.objects
        .filter(**filter_kwargs)
        .order_by('day')
        .values_list('route', 'day')
    )

    days_by_route_id = {}
    for route_id, day in route_id_days:
        days_by_route_id.setdefault(route_id, []).append(day)

    routes = routes_models.Route.objects.filter(id__in=days_by_route_id.keys())
    for route in routes:
        availability = _fill_out(
            when_start, when_end, days_by_route_id.get(route.id)
        )
        yield route, availability


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
