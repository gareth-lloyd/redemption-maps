import { Injectable } from '@angular/core';


export enum AppState {
  SearchOptions = "search",
  OutboundDates = "outboudn",
  InboundDates = "inbound",
  SelectDestination = "select",
  ViewAvailability = "view"
}

@Injectable()
export class AppStateService {
  state: AppState = AppState.SearchOptions;

  setState(state: AppState) {
    this.state = state;
  }
}
