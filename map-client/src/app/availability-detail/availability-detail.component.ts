import { Component, Input, OnInit } from '@angular/core';
import { RouteAvailability } from '../route-availability';

@Component({
  selector: 'app-availability-detail',
  templateUrl: './availability-detail.component.html',
  styleUrls: ['./availability-detail.component.scss']
})
export class AvailabilityDetailComponent implements OnInit {
  @Input() selectedRoute: RouteAvailability;

  constructor() { }

  ngOnInit() {
  }

}
