import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { RouteAvailability } from './route-availability';
import { AvailabilityService } from './availability.service';
import { Search } from './search';
import { LOW_CONTRAST } from './map-constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lat: number = 51.678;
  lng: number = 0;
  loading: boolean = false;

  step: number = 0;
  styles = LOW_CONTRAST;

  routeAvailabilitiesSubj : BehaviorSubject<RouteAvailability[]> = new BehaviorSubject([]);
  selectedRouteSubj: BehaviorSubject<RouteAvailability> = new BehaviorSubject(null);

  constructor(private availabilityService: AvailabilityService) {}

  doSearch(search) {
    this.loading = true;
    this.routeAvailabilitiesSubj.next([]);
    this.selectedRouteSubj.next(null);
    this.availabilityService
      .getAvailability(search)
      .subscribe(routeAvailabilities => {
        this.routeAvailabilitiesSubj.next(routeAvailabilities);
        this.loading = false;
        this.nextStep();
      });
  }

  selectRoute(route: RouteAvailability) {
    this.selectedRouteSubj.next(route);
    this.nextStep();
  }

  setStep(step : number) {
    this.step = step;
  }
  nextStep() {
    if(this.step < 2) {
      this.step++;
    }
  }
  prevStep() {
    if(this.step > 0) {
      this.step--;
    }
  }
}
