import { Component, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { AvailabilityService } from '../availability.service';
import { DateRangeComponent } from '../date-range/date-range.component';

@Component({
  selector: 'app-dates',
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.scss']
})
export class DatesComponent {
  @ViewChild('inboundDateRange') inboundDateRange: DateRangeComponent;
  outboundSelected: boolean = false;
  inboundSelected: boolean = false;

  constructor(
    private availabilityService: AvailabilityService,
  ) { }

  outboundDateRangeChanged(dateRange: NgbDateStruct[]) {
    this.availabilityService.setOutboundDates(
      dateRange[0], dateRange[1]
    );
    this.inboundDateRange.setMin(dateRange[0]);
    this.outboundSelected = true;
  }

  inboundDateRangeChanged(dateRange: NgbDateStruct[]) {
    this.availabilityService.setInboundDates(
      dateRange[0], dateRange[1]
    );
    this.inboundSelected = true;
  }

  submit() {

  }
}
