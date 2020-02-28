import { Component, 
         OnInit
       }                                   from '@angular/core'
import { MatDialog, 
         MatDialogConfig 
       }                                   from '@angular/material'
import { AddSlotComponent }                from '../add-slot/add-slot.component'
import { DbService }                       from 'src/app/services/db.service'
import { Slot }                            from 'src/app/constants'
import { GetSlots }                        from 'src/app/constants/api-interfaces'
import { Utils }                           from 'src/app/utils/app-utils'

@Component({
  selector    : 'app-manage-slots',
  templateUrl : './manage-slots.component.html',
  styleUrls   : ['./manage-slots.component.css']
})

export class ManageSlotsComponent implements OnInit {

  currDaySlots : Slot[] = []
  selectedSlot : Slot
  errorMsg     : string = ''
  succMsg      : string = ''
  days : string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY','FRIDAY', 'SATURDAY', 'SUNDAY']

  constructor(private dialog     : MatDialog,
              private dbService  : DbService,
              private utils      : Utils) { 

  }

  ngOnInit() {

    this.getCurrDaySlots()
  }

  async getCurrDaySlots() {

    const resp = await this.dbService.getSlots() as GetSlots.response
    if (this.utils.isError(resp)) {
      this.errorMsg = "Something went wrong, please try again after some time."
      return
    }
    this.currDaySlots = resp.slots
    if (!this.currDaySlots.length) this.errorMsg = "You dont have any slots, please add one."
  }

  addSlot() {

    this.errorMsg = null
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true
    dialogConfig.autoFocus    = true
    const dialogRef = this.dialog.open(AddSlotComponent, dialogConfig)
    dialogRef.componentInstance.currSlots = this.currDaySlots
    dialogRef.afterClosed().subscribe(

      data => {
        if (data) {
          this.addSlotApi(data)
        }
      }
    )
  }

  async addSlotApi(data : any) {

    const resp = await this.dbService.addSlot(data as Slot)

    if (this.utils.isError(resp)) {
      this.errorMsg = "Something went wrong, please try again after some time."
      return
    }
    this.succMsg = "Slot added successfully"
    const slotsResp = await this.dbService.getSlots() as GetSlots.response
    this.currDaySlots = slotsResp.slots
  }

  async deleteSlot() {

    this.succMsg  = null
    this.errorMsg = null

    if (!this.selectedSlot) {
      this.errorMsg = "Please select a slot to delete"
      return
    } 

    const delResp = await this.dbService.deleteSlot(this.selectedSlot.slotId)
    if (this.utils.isError(delResp)) {
      this.errorMsg = "Something went wrong, please try again after some time."
      return
    }
    this.succMsg  = "Slot deleted successfully. "
    this.getCurrDaySlots()
  }

  onSlotSelect(slot : Slot) {
    this.errorMsg = null
    this.succMsg  = null
    
    if (this.selectedSlot && slot.slotId === this.selectedSlot.slotId) this.selectedSlot = null
    else this.selectedSlot = slot
  }

}
