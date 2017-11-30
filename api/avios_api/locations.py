import itertools
from avios_api import core


PATH = 'productlocations'

ARG_PRODUCT_CAT = ('productCategory', 'flight')
ARG_CLIENT = ('client', 'avios')
ARG_CARRIER_CODE = ('carrierCode', 'BA')
ARG_INCLUDE_SUBSID = ('includeSubsidiary', 'Y')
ARG_INCLUDE_FRANCHISEE = ('includeFranchisee', 'Y')

DEFAULT_ARGS = (
    ARG_PRODUCT_CAT,
    ARG_CLIENT,
    ARG_CARRIER_CODE,
    ARG_INCLUDE_SUBSID,
    ARG_INCLUDE_FRANCHISEE,
)

TYPE_AIRPORT = 'AIRPORT'
TYPE_REGION = 'REGION'
TYPE_COUNTRY = 'COUNTRY'
TYPE_CITY = 'CITY'


def get_locations():
    params = DEFAULT_ARGS
    return core.get(PATH, params)


def get_airports():
    locations_response = get_locations()
    return get_by_type(locations_response, TYPE_AIRPORT)


def get_regions():
    locations_response = get_locations()
    return get_by_type(locations_response, TYPE_REGION)


def get_countries():
    locations_response = get_locations()
    return get_by_type(locations_response, TYPE_COUNTRY)


def get_cities():
    locations_response = get_locations()
    return get_by_type(locations_response, TYPE_CITY)


def get_by_type(locations_response, type_):
    if locations_response.get('type') == type_:
        return [locations_response]

    return itertools.chain.from_iterable(
        get_by_type(location, type_) for location in locations_response['location']
    )
