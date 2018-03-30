import { Component, OnInit } from '@angular/core';
import { LOW_CONTRAST } from '../map-constants';


@Component({
  selector: 'app-destingation-map',
  templateUrl: './destingation-map.component.html',
  styleUrls: ['./destingation-map.component.scss']
})
export class DestingationMapComponent implements OnInit {


  styles = LOW_CONTRAST;
  constructor() { }

  ngOnInit() {
  }

}
