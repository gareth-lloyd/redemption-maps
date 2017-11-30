import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpgPv4Ksu7rb1o_N1zF4N2XaEJ_k-LwQM'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
