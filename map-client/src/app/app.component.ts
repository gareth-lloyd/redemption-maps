import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RouteAvailability } from './route-availability';
import { AvailabilityService } from './availability.service';
import { AppStateService, AppState } from './app-state.service';
import { Search } from './search';
import { Location } from './location';
import { LOW_CONTRAST } from './map-constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lat: number = 51.678;
  lng: number = 0;

  styles = LOW_CONTRAST;
  loading: boolean = false;

  routeAvailabilitiesSubj : BehaviorSubject<RouteAvailability[]> = new BehaviorSubject([]);
  selectedRoute: RouteAvailability;

  constructor(
    private availabilityService: AvailabilityService,
    public appState: AppStateService
  ) {}

  doSearch(search) {
    this.routeAvailabilitiesSubj.next([]);
    this.selectedRoute = null;
    this.loading = true;
    this.appState.setState(AppState.SelectDestination);
    this.availabilityService
      .getAvailability(search)
      .subscribe(routeAvailabilities => {
        this.routeAvailabilitiesSubj.next(routeAvailabilities);
        this.loading = false;
      });
  }

  selectRoute(route: RouteAvailability) {
    this.selectedRoute = route;
    this.appState.setState(AppState.ViewAvailability);
  }

}
