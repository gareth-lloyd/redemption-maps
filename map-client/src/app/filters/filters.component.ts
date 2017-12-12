import { Component, OnInit } from '@angular/core';
import { Search }    from '../search';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  outboundFrom: NgbDateStruct;
  outboundTo: NgbDateStruct;
  inboundFrom: NgbDateStruct;
  inboundTo: NgbDateStruct;

  cabins = ['economy', 'premium_economy', 'business', 'first'];

  public search = new Search(
    'LON', this.cabins[2], 2
  );

  outboundDateRangeChanged(dateRange: NgbDateStruct[]) {
    this.outboundFrom = dateRange[0];
    this.outboundTo = dateRange[1];
  }
  inboundDateRangeChanged(dateRange: NgbDateStruct[]) {
    this.inboundFrom = dateRange[0];
    this.inboundTo = dateRange[1];
  }

  onSubmit() {
    debugger;
  }

}
