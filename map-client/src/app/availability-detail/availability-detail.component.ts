import { Component, Input, OnInit } from '@angular/core';
import { RouteAvailability } from '../route-availability';
import { Observable } from 'rxjs/Observable';

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
