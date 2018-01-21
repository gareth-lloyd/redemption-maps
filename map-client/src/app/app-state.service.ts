import { Injectable } from '@angular/core';


export const AppState = {
  SearchOptions: "search",
  OutboundDates: "outbound",
  InboundDates: "inbound",
  SelectDestination: "select",
  ViewAvailability: "view"
}

@Injectable()
export class AppStateService {
  public state: string = AppState.SearchOptions;

  setState(state: string) {
    this.state = state;
  }
}
