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
  search: Search = new Search('LON', 'business', 2);
  styles = LOW_CONTRAST;

  routeAvailabilitiesSubj : BehaviorSubject<RouteAvailability[]> = new BehaviorSubject<RouteAvailability[]>([]);
  routeAvailabilities : RouteAvailability[];

  constructor(private availabilityService: AvailabilityService) {}

  doSearch() {
    this.loading = true;
    this.availabilityService
      .getAvailability(this.search)
      .subscribe(routeAvailabilities => {
        this.routeAvailabilitiesSubj.next(routeAvailabilities);
        this.routeAvailabilities = routeAvailabilities;
        this.loading = false;
        this.nextStep();
      });
  }

  setStep(step : number) {
    this.step = step;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    if(this.step > 0) {
      this.step--;
    }
  }
}
