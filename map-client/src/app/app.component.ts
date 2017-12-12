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
  lng: number = 7.809;
  routeAvailabilities: RouteAvailability[];

  constructor(private availabilityService: AvailabilityService) {}

  newSearch(search: Search) {
    let obs = this.availabilityService
      .getAvailability(search)
      .subscribe(routeAvailabilities => {
        console.log(routeAvailabilities);
        this.routeAvailabilities = routeAvailabilities;
      });
  }
}
