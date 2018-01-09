import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';

import { LocationService } from './location-service';
import { Search } from '../search';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Output() searchSubmit = new EventEmitter<Search>();
  search: Search = new Search('LON', 'business', 2);

  constructor(private locationService: LocationService) { }

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
