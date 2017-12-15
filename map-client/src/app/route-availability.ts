import * as moment from 'moment';

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
  public originCode: string;
  public destinationCode: string;

  fromJSON(json: any) {
    this.originCode = json.origin_code;
    this.destinationCode = json.destination_code;
    return this;
  }
}

export class RouteAvailability {
  public route : Route;
  public availability: PossibleDay[];

  fromJSON(json: any) {
    this.route = new Route().fromJSON(json.route);
    this.availability = json.availability.map(a => new PossibleDay().fromJSON(a));
    return this;
  }
}
