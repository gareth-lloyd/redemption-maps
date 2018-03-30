import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvailabilityDetailComponent } from './availability-detail/availability-detail.component';
import { DestinationTableComponent } from './destination-table/destination-table.component';
import { FiltersComponent } from './filters/filters.component';
import { DatesComponent } from './dates/dates.component';



const routes: Routes = [
  { path: '', redirectTo: '/filters', pathMatch: 'full' },
  { path: 'filters', component: FiltersComponent },
  { path: 'dates', component: DatesComponent },
  { path: 'options', component: DestinationTableComponent },
  { path: 'details', component: AvailabilityDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
