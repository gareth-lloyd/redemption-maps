import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { environment } from '../environments/environment';
import { LocationService } from './location-service';
import { RouteAvailability } from './route-availability';
import { Search } from './search';


@Injectable()
export class AvailabilityService {
  private url: string = environment.server + '/api/availability/';

  constructor(private http: HttpClient, private locationService: LocationService) { }

  getAvailability(search: Search) : Observable<RouteAvailability[]> {
    let options = {params: search.asHttpParams()};
    return this.http.get<RouteAvailability[]>(this.url, options)
      .map(routeAvailabilities => routeAvailabilities.map(r => {
        let origin = this.locationService.byCode(r.origin_code);
        let destination = this.locationService.byCode(r.destination_code);
        return new RouteAvailability(origin, destination).fromJSON(r)
      }));
  }
}
