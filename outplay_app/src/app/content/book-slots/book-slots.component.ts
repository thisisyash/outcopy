import { Component, 
         OnInit, 
         ViewChild 
       }                           from '@angular/core'
import { MatCalendar }             from '@angular/material'
import { DbService }               from 'src/app/services/db.service'
import { BookedSlot, 
         Slot, 
         DAY, 
         ComponentRoutes 
       }                           from 'src/app/constants'
import { Router }                  from '@angular/router'
import { GetBookedSlots }          from 'src/app/constants/api-interfaces'
import { Utils }                   from 'src/app/utils/app-utils'

@Component({
  selector    : 'app-book-slots',
  templateUrl : './book-slots.component.html',
  styleUrls   : ['./book-slots.component.css']
})

export class BookSlotsComponent implements OnInit {

  @ViewChild(MatCalendar, {static : true}) datePicker: MatCalendar<Date>

  selectedSlot : Slot
  currDaySlots : Slot[]       = []
  bookedSlots  : BookedSlot[] = []
  selectedDate : Date
  today        : Date   = new Date()
  errorMsg     : string = ''
  userName     : string = ''

  DAY : typeof DAY = DAY

  constructor(private dbService : DbService,
              private router    : Router,
              private utils     : Utils) { 

    const date = new Date()
    this.selectedDate = date
    date.setHours(0,0,0,0);
    this.setCurrDayUnBookedSlots(this.selectedDate)
  }

  ngOnInit() {

  }

  selectSlot(slot : Slot) {
    this.selectedSlot = slot
  }
  
  async bookSlot() {

    if (!this.userName) {
      this.errorMsg = "Please enter your name"
      return
    }

    if (!this.selectedSlot) {
      this.errorMsg = "Please select a slot to continue"
      return
    } 

    const selSlot : BookedSlot = {
      dayTs    : this.selectedDate.getTime(),
      slotId   : this.selectedSlot.slotId,
      userName : this.userName
    }

    const resp = await this.dbService.bookSlot(selSlot)
    if (this.utils.isError(resp)) {
      this.errorMsg = "Something went wrong, please try again after some time."
      return
    }
    this.router.navigateByUrl(ComponentRoutes.BookingStat)
  }

  change(event : Date) {
    this.selectedSlot = undefined
    this.selectedDate = event
    this.setCurrDayUnBookedSlots(this.selectedDate)
  }

  private async setCurrDayUnBookedSlots(date : Date) {

    const bookedSlotsResp = await this.dbService.getBookedSlots(date.getTime()) as GetBookedSlots.response

    if (this.utils.isError(bookedSlotsResp)) {
      this.errorMsg = "Something went wrong, please try again after some time."
      return
    }

    this.currDaySlots = await this.dbService.getDaySlots(date.getDay())
    this.bookedSlots  = bookedSlotsResp.bookedSlots
    const currSlotIds = this.bookedSlots.map(slot => slot.slotId)
    this.currDaySlots = this.currDaySlots.filter(slot => currSlotIds.indexOf(slot.slotId) === -1)
  }
}
