import { Component } from '@angular/core';

import { RouteAvailability } from './route-availability';
import { AvailabilityService } from './availability.service';
import { Search } from './search';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lat: number = 51.678;
  lng: number = 0;
  loading: boolean = false;
  routeAvailabilities: RouteAvailability[];
  step: number = 0;
  search: Search = new Search('LON', 'business', 2);

  constructor(private availabilityService: AvailabilityService) {}

  doSearch() {
    this.loading = true;
    this.availabilityService
      .getAvailability(this.search)
      .subscribe(routeAvailabilities => {
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
