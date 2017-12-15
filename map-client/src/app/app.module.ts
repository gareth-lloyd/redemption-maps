import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AvailabilityService } from './availability.service';
import { LocationService } from './location.service.service';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { DateRangeComponent } from './date-range/date-range.component';
import { FiltersComponent } from './filters/filters.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DestinationTableComponent } from './destination-table/destination-table.component';
import { AvailabilityDetailComponent } from './availability-detail/availability-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    DateRangeComponent,
    DestinationTableComponent,
    AvailabilityDetailComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpgPv4Ksu7rb1o_N1zF4N2XaEJ_k-LwQM'
    }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    NgbModule.forRoot()
  ],
  providers: [AvailabilityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
