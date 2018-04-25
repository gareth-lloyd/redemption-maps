from datetime import date
import time

from geopy.distance import great_circle
from django.db import transaction
from django.utils import timezone

from routes import models as routes_models
from avios_api import availability, locations
from infrastructure import date_util


CABINS = ['economy', 'premium_economy', 'business', 'first']


def _store_location(response_dict, parent=None, location=None):
    return routes_models.Location.objects.get_or_create(
        type=response_dict['type'],
        code=response_dict['code'],
        defaults=dict(
            name=response_dict['name'],
            location=location,
            parent=parent
        )
    )[0]


def store_locations():
    for region_dict in locations.get_regions():
        region = _store_location(region_dict)

        for country_dict in locations.get_by_type(
            region_dict, locations.TYPE_COUNTRY
        ):
            country = _store_location(country_dict, parent=region)

            for city_dict in locations.get_by_type(
                country_dict, locations.TYPE_CITY
            ):
                city = _store_location(city_dict, parent=country)

                for airport_dict in locations.get_by_type(
                    city_dict, locations.TYPE_AIRPORT
                ):
                    _store_location(airport_dict, parent=city)


def update_city_to_city_availability(route, cabin, n_passengers):
    assert route.origin.type == routes_models.Location.CITY
    assert route.destination.type == routes_models.Location.CITY
    assert n_passengers <= 4

    today = date.today()
    furthest = availability.furthest_availability_date()
    journey_availability = availability.get_city_to_city_availability(
        today, furthest, route.origin.code, route.destination.code,
        cabin, n_passengers
    )
    _store_city_to_city_availability(
        today, furthest, route, cabin, n_passengers, journey_availability,
    )


@transaction.atomic
def _store_city_to_city_availability(
    start, end, route, cabin, n_passengers, journey_availability
):
    should_be_present = set(
        date_util.day_iterator_inclusive(start, end)
    )
    are_present = set(
        routes_models.RouteAvailability.objects
        .filter(route=route, cabin=cabin)
        .values_list('day', flat=True)
    )
    for day_to_create in should_be_present.difference(are_present):
        routes_models.RouteAvailability.objects.create(
            route=route, cabin=cabin, day=day_to_create
        )

    seats_field = routes_models.RouteAvailability.seat_field_name(n_passengers)
    (
        routes_models.RouteAvailability.objects
        .filter(route=route, cabin=cabin, day__gte=start)
        .update(**{seats_field: False})
    )

    available_days = [
        day for day, available in journey_availability if available
    ]
    (
        routes_models.RouteAvailability.objects
        .filter(route=route, cabin=cabin, day__in=available_days)
        .update(**{seats_field: True, 'updated': timezone.now()})
    )


def update_city_to_region_availability(
    airline, city, region, cabin, n_passengers
):
    today = date.today()
    furthest = availability.furthest_availability_date()
    availability_iter = availability.get_city_to_continent_availability(
        today, furthest, city.code, region.code, cabin, n_passengers
    )
    for origin_code, destination_code, availability_dict in availability_iter:
        origin = routes_models.Location.objects.get(
            type=routes_models.Location.CITY, code=origin_code
        )
        destination = routes_models.Location.objects.get(
            type=routes_models.Location.CITY, code=destination_code
        )
        route, _ = routes_models.Route.objects.get_or_create(
            origin=origin, destination=destination, airline=airline
        )
        _store_city_to_city_availability(
            today, furthest, route, cabin, n_passengers, availability_dict
        )


def update_city_availability(airline, city):
    regions = (
        routes_models.Location.objects.filter(
            type=routes_models.Location.REGION
        )
    )

    for region in regions:
        for cabin in CABINS:
            for n_passengers in [1, 2, 3, 4]:
                time.sleep(2)
                update_city_to_region_availability(
                    airline, city, region, cabin, n_passengers
                )


def update_availability():
    airline = routes_models.Airline.objects.get()
    origin_cities = routes_models.Location.objects.filter(is_origin=True)
    for origin in origin_cities:
        update_city_availability(airline, origin)


OFF_PEAK, PEAK = 0, 1
COSTS = {
    (1, 650): {
        'economy': [4000, 4500],
        'premium_economy': [5750, 6750],
        'business': [7750, 9000],
        'first': [15500, 18000],
    },
    (650, 1150): {
        'economy': [6500, 7500],
        'premium_economy': [9500, 11250],
        'business': [12750, 15000],
        'first': [25500, 30000],
    },
    (1150, 2000): {
        'economy': [8500, 1000],
        'premium_economy': [12750, 15000],
        'business': [17000, 20000],
        'first': [34000, 40000],
    },
    (2000, 3000): {
        'economy': [10000, 12500],
        'premium_economy': [20000, 25000],
        'business': [31250, 37500],
        'first': [42500, 50000],
    },
    (3000, 4000): {
        'economy': [13000, 20000],
        'premium_economy': [26000, 40000],
        'business': [50000, 60000],
        'first': [68000, 80000],
    },
    (4000, 5500): {
        'economy': [16250, 25000],
        'premium_economy': [32500, 50000],
        'business': [62500, 75000],
        'first': [85000, 100000],
    },
    (5500, 6500): {
        'economy': [19500, 30000],
        'premium_economy': [39000, 60000],
        'business': [75000, 90000],
        'first': [10200, 120000],
    },
    (6500, 7000): {
        'economy': [22750, 35000],
        'premium_economy': [45500, 70000],
        'business': [87500, 105000],
        'first': [119000, 140000],
    },
    (7000, 99999): {
        'economy': [32500, 50000],
        'premium_economy': [65000, 100000],
        'business': [125000, 150000],
        'first': [170000, 200000],
    },
}


def route_distance_miles(route):
    origin_coords = list(
        reversed(route.origin.location.coords)
    )
    destination_coords = list(
        reversed(route.destination.location.coords)
    )
    return (
        great_circle(origin_coords, destination_coords).miles
    )


def miles_costs(route, cabin):
    distance_miles = route_distance_miles(route)
    for (lower, upper), costs in COSTS.items():
        if lower <= distance_miles <= upper:
            return costs[cabin]


def record_peak(start, end, is_peak):
    for day in date_util.day_iterator_inclusive(start, end):
        p, created = (
            routes_models.PeakDay.objects
            .get_or_create(day=day, defaults={'is_peak': is_peak})
        )
        if not created:
            p.is_peak = is_peak
            p.save()

PEAKS = [
    (date(2018, 4, 1), date(2018, 4, 15), True),
    (date(2018, 4, 16), date(2018, 5, 24), False),
    (date(2018, 5, 25), date(2018, 6, 3), True),
    (date(2018, 6, 4), date(2018, 7, 6), False),
    (date(2018, 7, 7), date(2018, 9, 6), True),
    (date(2018, 9, 7), date(2018, 10, 11), False),
    (date(2018, 10, 12), date(2018, 10, 28), True),
    (date(2018, 10, 29), date(2018, 12, 13), False),
    (date(2018, 12, 14), date(2019, 1, 6), True),
    (date(2019, 1, 7), date(2019, 2, 14), False),
    (date(2019, 2, 15), date(2019, 2, 18), True),
    (date(2019, 2, 19), date(2019, 2, 20), False),
    (date(2019, 2, 21), date(2019, 2, 24), True),
    (date(2019, 2, 25), date(2019, 3, 23), False),
]


def update_route_availabilities_peaks():
    for peak_day in routes_models.PeakDay.objects.all().iterator():
        (
            routes_models.RouteAvailability.objects.filter(day=peak_day.day)
            .update(is_peak=peak_day.is_peak)
        )


def update_routes():
    for r in routes_models.Route.objects.all().iterator():
        print(r)
        r.distance_miles = route_distance_miles(r)
        r.save()
        for cabin in CABINS:
            miles_cost, miles_cost_peak = miles_costs(r, cabin)
            (
                routes_models.RouteAvailability.objects
                .filter(route=r, is_peak=True, cabin=cabin)
                .update(miles_cost=miles_cost_peak)
            )
            (
                routes_models.RouteAvailability.objects
                .filter(route=r, is_peak=False, cabin=cabin)
                .update(miles_cost=miles_cost)
            )
