import { Component, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog, MatDialogRef } from '@angular/material';


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
export class AppComponent implements AfterViewInit {
  lat: number = 51.678;
  lng: number = 0;

  styles = LOW_CONTRAST;
  loading: boolean = false;

  routeAvailabilitiesSubj : BehaviorSubject<RouteAvailability[]> = new BehaviorSubject([]);
  selectedRoute: RouteAvailability;

  constructor(
    private availabilityService: AvailabilityService,
    public appState: AppStateService,
    public dialog: MatDialog
  ) { }

  ngAfterViewInit() {
    let dialogRef = this.dialog.open(IntroDialog, {width: '500px'});

    dialogRef.afterClosed().subscribe(result => {
      this.appState.setState(AppState.SearchOptions);
    });
  }

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
    this.lat = route.route.destination.location.coordinates[1];
    this.lng = route.route.destination.location.coordinates[0];
    this.appState.setState(AppState.ViewAvailability);
  }

}

@Component({
  templateUrl: 'intro-dialog.html',
})
export class IntroDialog {

  constructor(public dialogRef: MatDialogRef<IntroDialog>) { }

}
