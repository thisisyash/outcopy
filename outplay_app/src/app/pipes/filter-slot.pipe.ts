import { Pipe, 
         PipeTransform 
       }                           from '@angular/core'
import { Slot }                    from '../constants'

@Pipe({
  name: 'filterSlot'
})

export class FilterSlotPipe implements PipeTransform {

  fileredSlots : Slot[] = []
  transform(value: Slot[], ...args: any[]): Slot[] {
    if (value.length)
    this.fileredSlots = value.filter(slot => slot.slotDay === args[0])
    return this.fileredSlots
  }
}
