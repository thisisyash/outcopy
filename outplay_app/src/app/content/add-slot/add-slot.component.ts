import { Component }               from '@angular/core'
import { MatDialogRef }            from '@angular/material'
import { DAY, 
         Slot 
       }                           from 'src/app/constants'
import { TimePipe }                from 'src/app/pipes'


export enum TIME_FORMAT {
  HOURS   = 'HOURS',
  MINUTES = 'MINUTES'
}

@Component({
  selector    : 'app-add-slot',
  templateUrl : './add-slot.component.html',
  styleUrls   : ['./add-slot.component.css']
})

export class AddSlotComponent {

  slot : Slot
  currSlots : Slot[] = []
  TIME_FORMAT : typeof TIME_FORMAT = TIME_FORMAT

  hours   : number 
  minutes : number
  isAm    : boolean = true

  toHrs   : number
  toMins  : number
  toIsAm  : boolean = true

  errorMsg  : string 

  days : string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY','FRIDAY', 'SATURDAY', 'SUNDAY']

  selectedDay : string 

  constructor(private dialogRef: MatDialogRef<AddSlotComponent>) { 

  }

  close() {
    if (this.slot)
      this.dialogRef.close(this.slot)
    else
      this.dialogRef.close()
  }


  increment(timeType : TIME_FORMAT, isFrm : boolean = true) {

    switch (timeType) {
      case TIME_FORMAT.HOURS:
        if (isFrm) {
          if (!this.hours) this.hours = 0
          if (this.hours < 12) this.hours++
        } else {
          if (!this.toHrs) this.toHrs = 0
          if (this.toHrs < 12) this.toHrs++
        }
      break
      case TIME_FORMAT.MINUTES:
        if (isFrm) {
          if (!this.minutes) this.minutes = 0
          if (this.minutes < 59) this.minutes++
        } else {
          if (!this.toMins) this.toMins = 0
          if (this.toMins < 59) this.toMins++
        }
      break
    }
  }

  decrement(timeType : TIME_FORMAT, isFrm : boolean = true) {

    switch (timeType) {
      case TIME_FORMAT.HOURS:
        if (isFrm) {
          if (this.hours > 1) this.hours--
        } else {
          if (this.toHrs > 1) this.toHrs--
        }
      break
      case TIME_FORMAT.MINUTES:
        if (isFrm) {
          if (this.minutes > 0) this.minutes--
        } else {
          if (this.toMins > 0) this.toMins--
        }
      break
    }
  }

  maxLengthCheck(event : any) {
    if (event.srcElement.value.length > 1) event.preventDefault()
  }

  changeMer(isFrm : boolean = true) {
    if (isFrm) this.isAm = !this.isAm
    else this.toIsAm = !this.toIsAm
  }

  submit() {

    let strtTs : any = (this.hours * 60 * 60) + (this.minutes * 60) 
    let endTs  : any = (this.toHrs * 60 * 60) + (this.toMins * 60)

    if (!this.isAm) strtTs = strtTs + (12 * 60 * 60)
    if (!this.toIsAm) endTs  = endTs  + (12 * 60 * 60)
    
    this.errorMsg = null
    if (!endTs)  this.errorMsg = "Please enter a end time" 
    if (!strtTs) this.errorMsg = "Please enter a start time"
    if (!this.selectedDay) this.errorMsg = "Please choose a day"
    if (this.hours > 12 || this.toHrs > 12) this.errorMsg    = "Hours cannot be greater than 12"
    if (this.minutes > 59 || this.toMins > 59) this.errorMsg = "Minutes cannot be greater than 59"
    if (strtTs === endTs) this.errorMsg  = "Start time and end time cannot be the same"
    if (strtTs > endTs) this.errorMsg    = "Start time cannot be greater than end time"

    if (this.errorMsg) return

    const currDaySlots = this.currSlots.filter(slot => slot.slotDay === this.selectedDay),
          timePipe     = new TimePipe()
    for (let slot of currDaySlots) {
      if ((strtTs >= slot.startTs && strtTs < slot.endTs) || (endTs > slot.startTs && endTs <= slot.endTs)) {
        this.errorMsg = "You already have a slot active from " + timePipe.transform(slot.startTs) + " to " 
                                                               + timePipe.transform(slot.endTs) 
                                                               + ". Please choose a different timing."
        return
      } 
    }

    this.slot = {
      endTs    : endTs,
      startTs  : strtTs,
      slotDay  : this.selectedDay as DAY,
    }
    
    this.close()
  }

}
