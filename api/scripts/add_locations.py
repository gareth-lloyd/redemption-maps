"""
{
    "name":"Keflavik International Airport",
    "city":"Keflavik",
    "country":"Iceland",
    "iata":"KEF",
    "icao":"BIKF",
    "latitude":"63.985",
    "longitude":"-22.605556",
    "altitude":"171",
    "timezone":"0",
    "dst":"N"
}
"""
import json
from django.contrib.gis.geos import Point
from routes import models as routes_models


def add_locations():
    with open('data/airports.json', 'rb') as f:
        json_airports = json.loads(f.read())

    airports = (
        routes_models.Location.objects
        .filter(type=routes_models.Location.AIRPORT)
    )
    for airport in airports:
        json_airport = json_airports[airport.code]
        airport.location = (
            Point(
                float(json_airport['longitude']),
                float(json_airport['latitude'])
            )
        )
        airport.save()
