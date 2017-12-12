from routes.models import Location
from django.contrib.gis.geos import Polygon, Point


def update_city_location(city):
    assert city.type == Location.CITY

    airports = city.children.filter(type=Location.AIRPORT)

    if airports.count() == 0:
        return
    elif airports.count() == 1:
        location = airports[0].location
    elif airports.count() == 2:
        a1, a2 = airports
        x = (a1.location.x + a2.location.x) / 2.0
        y = (a1.location.y + a2.location.y) / 2.0
        location = Point(x, y)
    else:
        coords = [
            airport.location.coords for airport in airports
        ]
        coords.append(coords[0])
        polygon = Polygon(coords)

        location = polygon.centroid

    city.location = location
    city.save()
