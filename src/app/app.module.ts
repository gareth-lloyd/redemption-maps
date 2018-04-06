import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AgmCoreModule } from '@agm/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent, IntroDialog } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AvailabilityService } from './availability.service';
import { AvailableDatesComponent } from './available-dates/available-dates.component';
import { AvailabilityDetailComponent } from './availability-detail/availability-detail.component';
import { DatesComponent } from './dates/dates.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { DestingationMapComponent } from './destingation-map/destingation-map.component';
import { DestinationTableComponent } from './destination-table/destination-table.component';
import { FiltersComponent } from './filters/filters.component';
import { LocationService } from './location-service';
import { TouchSelectComponent } from './touch-select/touch-select.component';
import { WindowSizeService } from './window-size.service';


@NgModule({
  declarations: [
    AppComponent,
    AvailableDatesComponent,
    IntroDialog,
    FiltersComponent,
    DateRangeComponent,
    DestinationTableComponent,
    AvailabilityDetailComponent,
    DestingationMapComponent,
    DatesComponent,
    TouchSelectComponent,
  ],
  entryComponents: [
    IntroDialog
  ],
  imports: [
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBpgPv4Ksu7rb1o_N1zF4N2XaEJ_k-LwQM'
    }),
    AgmSnazzyInfoWindowModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [AvailabilityService, LocationService, WindowSizeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
