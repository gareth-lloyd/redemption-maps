import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Location } from './location';

@Injectable()
export class LocationService {
  public locations: {};

  constructor(private http: HttpClient) {
    this.getLocations();
    this.locations = {};
  }

  byCode(code): Location {
    return this.locations[code];
  }

  private locationUrl: string = 'http://localhost:8000/api/locations/cities/';


  getLocations() {
    return this.http.get<Location[]>(this.locationUrl)
      .map(locationsRaw => locationsRaw.map(l => new Location().fromJSON(l)))
      .subscribe(locations => {
        locations.map(l => this.locations[l.code] = l);
      })
  }

}
