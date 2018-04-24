import { Component, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';

import { RouteAvailability } from '../route-availability';
import { AvailabilityService } from '../availability.service';

@Component({
  selector: 'app-destination-table',
  templateUrl: './destination-table.component.html',
  styleUrls: ['./destination-table.component.scss']
})
export class DestinationTableComponent {
  dataSource : MatTableDataSource<RouteAvailability> = new MatTableDataSource([]);

  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'region', 'distanceMiles', 'milesCost', 'select'];

  constructor(
    private availabilityService: AvailabilityService,
    private router: Router
  ) {
    this.availabilityService.routeAvailabilitiesSubj
      .subscribe(routeAvailabilities => this.dataSource.data = routeAvailabilities)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectRoute(route: RouteAvailability) {
    this.availabilityService.selectRoute(route);
    this.router.navigate(['details']);
  }
}
