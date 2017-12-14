import { HttpParams } from '@angular/common/http';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


export class Search {
  public cabinOptions = ['economy', 'premium_economy', 'business', 'first'];
  public numPassengersOptions = [1, 2, 3, 4];

  constructor(
    public originCode: string,
    public cabin: string,
    public numPassengers: number,
    public outboundStart?: NgbDateStruct,
    public outboundEnd?: NgbDateStruct,
    public inboundStart?: NgbDateStruct,
    public inboundEnd?: NgbDateStruct
  ) {  }

  public asHttpParams() : HttpParams {
    let params = new HttpParams();
    params = params.set('origin_code', this.originCode);
    params = params.set('cabin', this.cabin);
    params = params.set('n_passengers', this.numPassengers.toString());
    if(this.outboundStart) {
      params = params.set('when_start', this.formatDateForAPI(this.outboundStart));
      if(this.outboundEnd) {
        params = params.set('when_end', this.formatDateForAPI(this.outboundEnd));
      }
      else {
        params = params.set('when_end', this.formatDateForAPI(this.outboundStart));
      }
    }
    if(this.inboundStart && this.inboundEnd) {
      params = params.set('when_start', this.formatDateForAPI(this.inboundStart));
      params = params.set('when_end', this.formatDateForAPI(this.inboundEnd));
    }
    return params;
  }

  formatDateForAPI(date: NgbDateStruct) : string {
    return `${date.year}-${date.month}-${date.day}`;
  }

  formatDateForDisplay(date: NgbDateStruct) : string {
    return (date) ? `${date.day}/${date.month}/${date.year}` : '';
  }

  displayValue(fromDate: NgbDateStruct, toDate: NgbDateStruct): string {
    const fromStr = this.formatDateForDisplay(fromDate);
    const toStr = this.formatDateForDisplay(toDate);
    return (fromStr || toStr) ? `${fromStr} - ${toStr}` : '';
  }

  outboundDisplayValue(): string {
    return this.displayValue(this.outboundStart, this.outboundEnd);
  }
}
