import { Component, 
         OnInit 
       }                        from '@angular/core'
import { DbService }            from 'src/app/services/db.service'
import { GetBookedSlots,
         GetSlots 
       }                        from 'src/app/constants/api-interfaces'
import { BookedSlot }           from 'src/app/constants'
import { Utils }                from 'src/app/utils/app-utils'

@Component({
  selector    : 'app-view-slots',
  templateUrl : './view-slots.component.html',
  styleUrls   : ['./view-slots.component.css']
})

export class ViewSlotsComponent implements OnInit {

  coloumnNames : string[]      = ['dayTs', 'slotTime', 'userName']
  dataSource   : any
  bookedSlots  : BookedSlot[]  = []
  slotMap      : Object        = {}
  showComp     : boolean       = false

  constructor(private dbService : DbService,
              private utils     : Utils) {
   
    this.loadData()
  }

  ngOnInit() {

  }

  async loadData() {

    const bookedSlotResp  = await this.dbService.getAllBookedSlots() as GetBookedSlots.response
    const slotsResp       = await this.dbService.getSlots() as GetSlots.response

    if (this.utils.isError(bookedSlotResp) || this.utils.isError(slotsResp)) return

    for (const slot of slotsResp.slots) this.slotMap[slot.slotId] = slot

    this.bookedSlots = bookedSlotResp.bookedSlots
    this.dataSource  = this.bookedSlots
    this.showComp    = true
  }
}
