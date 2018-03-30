import { Component, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { AvailabilityService } from '../availability.service';
import { Location } from '../location';
import { LocationService } from '../location-service';
import { Search } from '../search';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  form: FormGroup;
  originCtrl: AbstractControl;
  filteredLocations: Observable<Location[]>;

  constructor(
    private availabilityService: AvailabilityService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
  ) {
      this.form = this.formBuilder.group({
        originCode: [
          this.availabilityService.search.originCode || 'LON',
          Validators.required
        ],
        cabin: [
          this.availabilityService.search.cabin || 'business',
          Validators.required
        ],
        numPassengers: [
          this.availabilityService.search.numPassengers || 2,
          Validators.required
        ],
      })
      this.originCtrl = this.form.get('originCode')
  }

  ngOnInit() {
    this.filteredLocations = this.originCtrl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): Location[] {
    val = val.toLowerCase();
    return this.locationService.allLocations.filter(location => {
      if (
        location.name.toLowerCase().indexOf(val) === 0 ||
        location.code.toLowerCase().indexOf(val) === 0
      ) {
        return location;
      }
    });
  }


  submit() {
    this.availabilityService.setFilters(this.form.value);
  }

}
