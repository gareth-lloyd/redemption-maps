import { Component } from '@angular/core';
import { RouteAvailability } from '../route-availability';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { AvailabilityService } from '../availability.service';
import { WindowSizeService, Layout } from '../window-size.service';


function formatDateForDisplay(date: NgbDateStruct) : string {
  return (date) ? `${date.day}/${date.month}/${date.year}` : '';
}

@Component({
  selector: 'app-availability-detail',
  templateUrl: './availability-detail.component.html',
  styleUrls: ['./availability-detail.component.scss']
})
export class AvailabilityDetailComponent {
  outboundDateStr: string;
  inboundDateStr: string;
  months: number;

  constructor(
    private availabilityService: AvailabilityService,
    private windowSizeService: WindowSizeService,
  ) {
    this.months = 1;
    this.windowSizeService.layout.subscribe((layout: Layout) => {
      this.months = (layout == Layout.Mobile) ? 1 : 2;
    })
  }

  outboundSelected(date: NgbDateStruct) {
    this.outboundDateStr = formatDateForDisplay(date);
  }
  inboundSelected(date: NgbDateStruct) {
    this.inboundDateStr = formatDateForDisplay(date);
  }
}
