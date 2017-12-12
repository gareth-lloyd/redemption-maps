import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class  DateRangeComponent {

  @Input() label: string;
  @Output() dateRangeChange = new EventEmitter<NgbDateStruct[]>();

  @ViewChild('picker') inputDatePicker;

  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(private calendar: NgbCalendar) { }

  ngAfterViewInit() {
    console.log('registered');
  }

  openDatePicker() {
    this.inputDatePicker.open();
    this.inputDatePicker._cRef.instance.registerOnChange(this.onDateChange.bind(this));
    this.inputDatePicker._cRef.instance.select.unsubscribe();
  }

  private formatDate(date: NgbDateStruct) : string {
    return (date) ? `${date.day}/${date.month}/${date.year}` : '';
  }

  displayValue(): string {
    const fromStr = this.formatDate(this.fromDate);
    const toStr = this.formatDate(this.toDate);
    return (fromStr || toStr) ? `${fromStr} - ${toStr}` : '';
  }

  onDateChange(date: NgbDateStruct) {
    debugger;
    console.log('on date change');

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if(this.fromDate && this.toDate) {
      this.dateRangeChange.emit([this.fromDate, this.toDate]);
      this.inputDatePicker.close();
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
}
