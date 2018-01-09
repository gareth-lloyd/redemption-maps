export class Location {
  public code: string;
  public name: string;
  public type: string;
  public location: object;
  public parent: Location;

  fromJSON(json: any) {
    this.code = json.code;
    this.type = json.type;
    this.name = json.name;
    this.location = json.location;

    return this;
  }
}
