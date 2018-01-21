
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbDatepicker, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import { PossibleDay } from '../route-availability';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

@Component({
  selector: 'available-dates',
  templateUrl: './available-dates.component.html',
  styleUrls: ['./available-dates.component.scss']
})
export class  AvailableDatesComponent {
  private _possibleDays: PossibleDay[] = new Array<PossibleDay>();
  private selectedDate: NgbDateStruct;
  private minDate: NgbDateStruct;

  @Output() selectionChange = new EventEmitter<NgbDateStruct>();
  @ViewChild('dp') datePicker: NgbDatepicker;

  @Input()
  set possibleDays(possibleDays: PossibleDay[]) {
    if (possibleDays.length) {
      this.minDate = possibleDays[0].day;
    }
    if (possibleDays.length === 1) {
      this.selectedDate = this.minDate;
    }
    else {
      this.selectedDate = null;
    }
    this._possibleDays = possibleDays;
    // Hack to clear current disabled days
    this.datePicker.navigateTo({year: 2029, month: 2});
    this.datePicker.navigateTo(this.minDate);
  }

  onDateChange() {
    this.selectionChange.emit(this.selectedDate);
  }

  markDisabled = date => !this._possibleDays.some(possibleDay => equals(date, possibleDay.day) && possibleDay.available);
}
