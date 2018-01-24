import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Location } from './location';

export class PossibleDay {
  day: NgbDateStruct;
  available: boolean;

  fromJSON(json: any) {
    let components = json.day.split('-');
    components = components.map(s => parseInt(s));
    this.day = {year: components[0], month: components[1], day: components[2]};
    this.available = json.available;
    return this;
  }
}

export class Route {
  constructor(public origin: Location, public destination: Location) {}
}

export class RouteAvailability {
  public destination_code;
  public origin_code;
  public route : Route;
  public availability: PossibleDay[];
  public inboundAvailability: PossibleDay[];

  availableDays(): number {
    return this.availability.filter(a => a.available).length;
  }

  availableInboundDays(): number {
    return this.inboundAvailability.filter(a => a.available).length;
  }

  public constructor(origin: Location, destination: Location) {
    this.route = new Route(origin, destination);
  }

  fromJSON(json: any) {
    this.availability = json.availability.map(a => new PossibleDay().fromJSON(a));
    if (json.inbound_availability) {
      this.inboundAvailability = json.inbound_availability.map(a => new PossibleDay().fromJSON(a));
    }
    return this;
  }
}
