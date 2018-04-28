import { Component, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AvailabilityService } from './availability.service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(
    public dialog: MatDialog,
    private availabilityService: AvailabilityService,
  ) { }

  ngAfterViewInit() {
    if (environment.production) {
      let dialogRef = this.dialog.open(IntroDialog, {width: '500px'});

      dialogRef.afterClosed().subscribe(result => { });
    }
  }

  canGoDates(): boolean {
    return !!this.availabilityService.search.cabin;
  }

  canGoOptions(): boolean {
    return !!this.availabilityService.search.outboundStart;
  }

  canGoDetail(): boolean {
    return !!this.availabilityService.selectedRoute;
  }
}

@Component({
  templateUrl: 'intro-dialog.html',
})
export class IntroDialog {

  constructor(public dialogRef: MatDialogRef<IntroDialog>) { }

}
