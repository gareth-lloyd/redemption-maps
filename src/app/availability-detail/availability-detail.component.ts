import { Component, Input, OnInit } from '@angular/core';
import { RouteAvailability } from '../route-availability';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


function formatDateForDisplay(date: NgbDateStruct) : string {
  return (date) ? `${date.day}/${date.month}/${date.year}` : '';
}

@Component({
  selector: 'app-availability-detail',
  templateUrl: './availability-detail.component.html',
  styleUrls: ['./availability-detail.component.scss']
})
export class AvailabilityDetailComponent {
  @Input() selectedRoute: RouteAvailability;
  outboundDateStr: string;
  inboundDateStr: string;

  outboundSelected(date: NgbDateStruct) {
    this.outboundDateStr = formatDateForDisplay(date);
  }
  inboundSelected(date: NgbDateStruct) {
    this.inboundDateStr = formatDateForDisplay(date);
  }
}
