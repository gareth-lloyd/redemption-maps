import * as moment from 'moment';
import { Location } from './location';

export class PossibleDay {
  day: moment.Moment;
  available: boolean;

  fromJSON(json: any) {
    this.day = moment(json.day);
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

  public constructor(origin: Location, destination: Location) {
    this.route = new Route(origin, destination);
  }

  fromJSON(json: any) {
    this.availability = json.availability.map(a => new PossibleDay().fromJSON(a));
    this.inboundAvailability = json.inbound_availability.map(a => new PossibleDay().fromJSON(a));
    return this;
  }
}
