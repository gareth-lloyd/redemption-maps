import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


export class Search {
  constructor(
    public originCode: string,
    public cabin: string,
    public numPassengers: number,
    public outboundStart?: NgbDateStruct,
    public outboundEnd?: NgbDateStruct,
    public inboundStart?: NgbDateStruct,
    public inboundEnd?: NgbDateStruct
  ) {  }

}
