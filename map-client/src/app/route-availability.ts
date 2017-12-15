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
  public origin;
  public destination;

  fromJSON(json: any) {
    this.origin = json.origin;
    this.destination = json.destination;
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
