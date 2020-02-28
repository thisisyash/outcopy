import { NgModule }                       from '@angular/core'
import { CommonModule }                   from '@angular/common'
import { LandingComponent }               from './landing/landing.component'
import { ManageSlotsComponent }           from './manage-slots/manage-slots.component'
import { BookSlotsComponent }             from './book-slots/book-slots.component'
import { ViewSlotsComponent }             from './view-slots/view-slots.component'
import { MatCardModule, 
         MatDialogModule, 
         MatFormFieldModule, 
         MatSelectModule, 
         MatDatepickerModule,
         MatNativeDateModule,
         MatTableModule,
         MatInput,
         MatInputModule
       }                                  from '@angular/material'
import { ContentRoutingModule }           from './content-routing.module'
import { AddSlotComponent }               from './add-slot/add-slot.component'
import { FormsModule }                    from '@angular/forms'
import { ReactiveFormsModule }            from '@angular/forms'
import { FilterSlotPipe }                 from '../pipes/filter-slot.pipe'
import { TimePipe }                       from '../pipes/time.pipe'
import { OrderByPipe }                    from '../pipes/order-by.pipe'
import { BookingStatComponent }           from './booking-stat/booking-stat.component'
import { HttpClientModule }               from '@angular/common/http'

@NgModule({
  declarations: [
    LandingComponent, 
    ManageSlotsComponent, 
    BookSlotsComponent, 
    ViewSlotsComponent, 
    AddSlotComponent,
    FilterSlotPipe,
    TimePipe,
    OrderByPipe,
    BookingStatComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ContentRoutingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule
  ]
})
export class ContentModule { }
