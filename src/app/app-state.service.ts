import { Injectable } from '@angular/core';


export const AppState = {
  Intro: "intro",
  SearchOptions: "search",
  OutboundDates: "outbound",
  InboundDates: "inbound",
  SelectDestination: "select",
  ViewAvailability: "view"
}

@Injectable()
export class AppStateService {
  public state: string = AppState.Intro;

  setState(state: string) {
    this.state = state;
  }
}
