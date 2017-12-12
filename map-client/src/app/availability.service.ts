import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { RouteAvailability } from './route-availability';
import { Search } from './search';


@Injectable()
export class AvailabilityService {
  private url: string = 'http://localhost:8000/api/availability/';

  constructor(private http: HttpClient) { }

  getAvailability(search: Search) : Observable<RouteAvailability[]> {
    let options = {params: search.asHttpParams()};
    return this.http.get<RouteAvailability[]>(this.url, options);
  }
}
