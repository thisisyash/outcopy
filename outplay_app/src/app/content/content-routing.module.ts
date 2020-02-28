import { NgModule }                   from '@angular/core'
import { Routes, 
         RouterModule 
       }                              from '@angular/router'
import { LandingComponent }           from './landing/landing.component'
import { ViewSlotsComponent }         from './view-slots/view-slots.component'
import { ManageSlotsComponent }       from './manage-slots/manage-slots.component'
import { BookSlotsComponent }         from './book-slots/book-slots.component'
import { BookingStatComponent }       from './booking-stat/booking-stat.component'


const routes: Routes = [
  { 
    path: '', 
    component : LandingComponent
  },
  {
    path: 'viewSlots',
    component : ViewSlotsComponent
  },
  {
    path: 'manageSlots',
    component : ManageSlotsComponent
  },
  {
    path: 'bookSlots',
    component : BookSlotsComponent
  },
  {
    path: 'bookingStatus',
    component : BookingStatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
