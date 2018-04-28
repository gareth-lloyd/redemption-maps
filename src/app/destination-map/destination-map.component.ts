import { Component, OnInit } from '@angular/core';
import { LOW_CONTRAST } from '../map-constants';

import { AvailabilityService } from '../availability.service';


@Component({
  selector: 'app-destination-map',
  templateUrl: './destination-map.component.html',
  styleUrls: ['./destination-map.component.scss']
})
export class DestinationMapComponent implements OnInit {


  styles = LOW_CONTRAST;
  constructor(public availabilityService: AvailabilityService) { }

  ngOnInit() {
  }

}
