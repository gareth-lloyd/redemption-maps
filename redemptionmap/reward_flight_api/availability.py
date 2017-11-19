from datetime import date, timedelta

from infrastructure.date_util import day_iterator_inclusive
from reward_flight_api import core

PATH = 'availableflightdates'

ARG_ORIGIN_CITY = 'originCity'
ARG_DESTINATION_CITY = 'destinationCity'
ARG_OUTBOUND_START_DATE = 'obStartDate' # YYYYMMDD
ARG_OUTBOUND_END_DATE = 'obEndDate' # YYYYMMDD
ARG_INBOUND_START_DATE = 'ibStartDate' # YYYYMMDD
ARG_INBOUND_END_DATE = 'ibEndDate' # YYYYMMDD
ARG_PAX_COUNT = 'paxCount'
ARG_CABIN = 'cabin'
ARG_REVENUE_TYPE = 'revenueType' # Redemption
ARG_MEMBER_COUNTRY = 'memberCountry'


def _build_params(
    origin_code, destination_code, ob_start, ob_end, n_passengers, cabin
):
    params = (
        (ARG_ORIGIN_CITY, origin_code),
        (ARG_DESTINATION_CITY, destination_code),
        (ARG_OUTBOUND_START_DATE, core.format_date(ob_start)),
        (ARG_OUTBOUND_END_DATE, core.format_date(ob_end)),
        (ARG_PAX_COUNT, n_passengers),
        (ARG_CABIN, cabin),
        (ARG_REVENUE_TYPE, 'Redemption'),
        (ARG_MEMBER_COUNTRY, 'GB'),
    )
    return params


def get_one_way_availability(
    origin_code, destination_code, cabin, n_passengers=1
):
    """
    {'preferredJourney': [{'destinationCity': ['CHI'],
       'endDate': '2018-11-07',
          'journeyAvailability': [{'cabinAvailability': [{'availability':
    """
    start = date.today()
    end = start + timedelta(354)

    params = _build_params(
        origin_code, destination_code, start, end, n_passengers, cabin
    )
    return _unpack_availability(core.get(PATH, params))


def _unpack_availability(availability_response):
    availability = (
        availability_response
        ['preferredJourney'][0]
        ['journeyAvailability'][0]
        ['cabinAvailability'][0]
        ['availability']
    )
    for availability, day in zip(
        availability, day_iterator_inclusive(start, end)
    ):
        yield (day, bool(int(availability)))
