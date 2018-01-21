import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { AppStateService } from '../app-state.service';
import { DateRangeComponent } from '../date-range/date-range.component';
import { Location } from '../location';
import { LocationService } from '../location-service';
import { Search } from '../search';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  originCtrl = new FormControl();
  @Output() searchSubmit = new EventEmitter<Search>();
  search: Search = new Search('LON', 'business', 2);
  filteredLocations: Observable<Location[]>;
  outboundSelected: boolean = false;
  inboundSelected: boolean = false;

  @ViewChild('inboundDateRange') inboundDateRange: DateRangeComponent;

  constructor(
    private locationService: LocationService,
    public appState: AppStateService
  ) {}

  ngOnInit() {
    this.filteredLocations = this.originCtrl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): Location[] {
    val = val.toLowerCase();
    return this.locationService.allLocations.filter(location => {
      if (
        location.name.toLowerCase().indexOf(val) === 0 ||
        location.code.toLowerCase().indexOf(val) === 0
      ) {
        return location;
      }
    });
  }

  outboundDateRangeChanged(dateRange: NgbDateStruct[]) {
    this.search.outboundStart = dateRange[0];
    this.search.outboundEnd = dateRange[1];
    this.inboundDateRange.setMin(dateRange[0]);
    this.outboundSelected = true;
  }

  inboundDateRangeChanged(dateRange: NgbDateStruct[]) {
    this.search.inboundStart = dateRange[0];
    this.search.inboundEnd = dateRange[1];
    this.inboundSelected = true;
  }

  submit() {
    this.searchSubmit.emit(this.search);
  }

}
