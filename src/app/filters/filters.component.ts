import { Component, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { AvailabilityService } from '../availability.service';
import { Location } from '../location';
import { LocationService } from '../location-service';
import { Search } from '../search';
import { SelectOption } from '../touch-select/touch-select.component';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  form: FormGroup;
  originCtrl: AbstractControl;
  filteredLocations: Observable<Location[]>;
  cabinOptions: SelectOption[];
  numPassengersOptions: SelectOption[];

  constructor(
    private availabilityService: AvailabilityService,
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router: Router
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
        avios: [
          undefined,
          Validators.pattern('\\d+')
        ],
      })
      this.originCtrl = this.form.get('originCode');

      this.cabinOptions = Object.keys(this.availabilityService.search.cabins).map((key) => {
        return { value: key, label: availabilityService.search.cabins[key] };
      })
      this.numPassengersOptions = [1, 2, 3, 4].map((x) => {
        return {value: x, label: x.toString() };
      });
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
    this.router.navigate(['dates']);
  }

}
