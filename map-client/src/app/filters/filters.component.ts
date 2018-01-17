import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

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

  constructor(private locationService: LocationService) { }

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
  }

  inboundDateRangeChanged(dateRange: NgbDateStruct[]) {
    this.search.inboundStart = dateRange[0];
    this.search.inboundEnd = dateRange[1];
  }

  submit() {
    this.searchSubmit.emit(this.search);
  }

}
