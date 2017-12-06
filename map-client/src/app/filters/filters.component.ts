import { Component, OnInit } from '@angular/core';
import { Search }    from '../search';
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
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {

  cabins = ['economy', 'premium_economy', 'business', 'first'];

  public search = new Search(
    'LON', 'business', 2
  );

  submitted = false;

  onSubmit() { this.submitted = true; }

  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(calendar: NgbCalendar) {
    this.search.outboundStart = calendar.getToday();
    this.search.outboundEnd = calendar.getToday();
  }

  onDateChange(date: NgbDateStruct) {
    if (! this.search.outboundStart && ! this.search.outboundEnd) {
      this.search.outboundStart = date;
    } else if ( this.search.outboundStart && ! this.search.outboundEnd && after(date,  this.search.outboundStart)) {
      this.search.outboundEnd = date;
    } else {
      this.search.outboundEnd = null;
      this.search.outboundStart = date;
    }
  }

  isHovered(date) {
    return (
       this.search.outboundStart &&
      ! this.search.outboundEnd &&
      this.hoveredDate &&
      after(date,  this.search.outboundStart) &&
      before(date, this.hoveredDate)
    )
  }
  isInside(date) {
    return (
      after(date,  this.search.outboundStart) &&
      before(date,  this.search.outboundEnd)
    )
  }
  isFrom(date) {
    return equals(date,  this.search.outboundStart);
  }
  isTo(date) {
    return equals(date,  this.search.outboundEnd);
  }
}
