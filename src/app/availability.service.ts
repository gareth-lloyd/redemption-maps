import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestOptionsArgs } from '@angular/http';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';
import { LocationService } from './location-service';
import { RouteAvailability } from './route-availability';
import { Search } from './search';

interface FilterInputs {
  originCode: string;
  numPassengers: number;
  cabin: string;
}

@Injectable()
export class AvailabilityService {
  private url: string = environment.server + '/api/availability/';
  search: Search = new Search();
  routeAvailabilitiesSubj : BehaviorSubject<RouteAvailability[]> = new BehaviorSubject([]);
  selectedRoute: RouteAvailability;
  lat: number = 51.678;
  lng: number = 0;

  setFilters(inputs: FilterInputs) {
    this.search.originCode = inputs.originCode;
    this.search.cabin = inputs.cabin;
    this.search.numPassengers = inputs.numPassengers;
  }
  setInboundDates(start: NgbDateStruct, end?: NgbDateStruct) {
    this.search.inboundStart = start;
    this.search.inboundEnd = end;
  }
  setOutboundDates(start: NgbDateStruct, end?: NgbDateStruct) {
    this.search.outboundStart = start;
    this.search.outboundEnd = end;
  }
  doSearch(search) {
    this.routeAvailabilitiesSubj.next([]);
    this.selectedRoute = null;
    this.getAvailability(search)
      .subscribe(routeAvailabilities => {
        this.routeAvailabilitiesSubj.next(routeAvailabilities);
      });
  }

  selectRoute(route: RouteAvailability) {
    this.selectedRoute = route;
    this.lat = route.route.destination.location.coordinates[1];
    this.lng = route.route.destination.location.coordinates[0];
  }

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
