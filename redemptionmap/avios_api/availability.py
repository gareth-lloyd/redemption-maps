from datetime import date, timedelta

from infrastructure.date_util import day_iterator_inclusive
from avios_api import core

PATH = 'availableflightdates'

ARG_ORIGIN_CITY = 'originCity'
ARG_DESTINATION_CITY = 'destinationCity'
ARG_DESTINATION_COUNTRY = 'destinationCountry'
ARG_DESTINATION_CONTINENT = 'destinationContinent'

ARG_OUTBOUND_START_DATE = 'obStartDate'
ARG_OUTBOUND_END_DATE = 'obEndDate'
ARG_INBOUND_START_DATE = 'ibStartDate'
ARG_INBOUND_END_DATE = 'ibEndDate'
ARG_PAX_COUNT = 'paxCount'
ARG_CABIN = 'cabin'
ARG_REVENUE_TYPE = 'revenueType' # Redemption
ARG_MEMBER_COUNTRY = 'memberCountry'


def _build_params(
    origin_code, ob_start, ob_end, n_passengers, cabin,
    city_code=None, country_code=None, continent_code=None,
    ib_start=None, ib_end=None,
):
    if not (city_code or country_code or continent_code):
        raise AssertionError("City, country or continent required")

    params = [
        (ARG_OUTBOUND_START_DATE, core.format_date(ob_start)),
        (ARG_OUTBOUND_END_DATE, core.format_date(ob_end)),
        (ARG_PAX_COUNT, n_passengers),
        (ARG_CABIN, cabin),
        (ARG_REVENUE_TYPE, 'Redemption'),
        (ARG_MEMBER_COUNTRY, 'GB'),
        (ARG_ORIGIN_CITY, origin_code),
    ]
    if city_code:
        params.append((ARG_DESTINATION_CITY, city_code))
    elif country_code:
        params.append((ARG_DESTINATION_COUNTRY, country_code))
    elif continent_code:
        params.append((ARG_DESTINATION_CONTINENT, continent_code))

    if ib_start:
        params.append((ARG_INBOUND_START_DATE, core.format_date(ib_start)))
    if ib_end:
        params.append((ARG_INBOUND_END_DATE, core.format_date(ib_end)))

    return params


def furthest_availability_date():
    return date.today() + timedelta(354)


def _has_errors(response_dict):
    if 'errors' in response_dict:
        return True
    """
    {'errors': [{'code': 'SSE_RAM_9010', 'reason': 'property:availability|error:NO_AVAILABILITY_FOUND', 'timeStamp': '2017-11-19T17:47:00.418Z'}]}
    """

def get_city_to_city_availability(
    start, end, origin_code, destination_code, cabin, n_passengers=1
):
    params = _build_params(
        origin_code, start, end, n_passengers, cabin,
        city_code=destination_code, ib_end=end, ib_start=start,
    )

    return list(
        _unpack_availability(core.get(PATH, params), start, end)
    )[0]


def get_city_to_country_availability(
    start, end, origin_code, destination_code, cabin, n_passengers=1
):
    params = _build_params(
        origin_code, start, end, n_passengers, cabin,
        country_code=destination_code, ib_end=end, ib_start=start,
    )
    return _unpack_availability(core.get(PATH, params), start, end)


def get_city_to_continent_availability(
    start, end, origin_code, destination_code, cabin, n_passengers=1,
):
    params = _build_params(
        origin_code, start, end, n_passengers, cabin,
        continent_code=destination_code, ib_end=end, ib_start=start,
    )
    response = core.get(PATH, params)
    if _has_errors(response):
        print(response)
        return []
    return _unpack_availability(response, start, end)


def _unpack_availability(availability_response, start, end):
    journey_availabilities = (
        availability_response['preferredJourney'][0]['journeyAvailability']
    )

    for journey_availability in journey_availabilities:
        origin_city = journey_availability[ARG_ORIGIN_CITY]
        destination_city = journey_availability[ARG_DESTINATION_CITY]
        availability = (
            journey_availability['cabinAvailability'][0]['availability']
        )
        availability = [
            (day, bool(int(availability)))
            for availability, day in zip(
                availability, day_iterator_inclusive(start, end)
            )
        ]
        yield origin_city, destination_city, availability
