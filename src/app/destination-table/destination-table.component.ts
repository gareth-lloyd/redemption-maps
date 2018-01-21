import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatTableDataSource } from '@angular/material';

import { RouteAvailability } from '../route-availability';

@Component({
  selector: 'app-destination-table',
  templateUrl: './destination-table.component.html',
  styleUrls: ['./destination-table.component.scss']
})
export class DestinationTableComponent {
  @Input() dataObservable: BehaviorSubject<RouteAvailability[]>;
  @Output() routeSelected: EventEmitter<RouteAvailability> = new EventEmitter();
  dataSource : MatTableDataSource<RouteAvailability> = new MatTableDataSource([]);

  displayedColumns = ['name', 'days', 'select'];

  ngOnInit() {
    this.dataObservable
      .subscribe(routeAvailabilities => this.dataSource.data = routeAvailabilities)
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  selectRoute(route: RouteAvailability) {
    this.routeSelected.emit(route);
  }
}
