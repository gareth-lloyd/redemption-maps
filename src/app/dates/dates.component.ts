import { Component, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { AvailabilityService } from '../availability.service';
import { WindowSizeService, Layout } from '../window-size.service';
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
  months: number = 2;

  constructor(
    private router: Router,
    private windowSizeService: WindowSizeService,
    private availabilityService: AvailabilityService,
  ) {
    this.windowSizeService.layout.subscribe((layout: Layout) => {
      this.months = (layout == Layout.Mobile) ? 1 : 2;
    })
  }

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
    this.availabilityService.doSearch();
    this.router.navigate(['options']);
  }
}
