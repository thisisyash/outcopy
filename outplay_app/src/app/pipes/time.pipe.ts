import { Pipe, 
         PipeTransform 
       }                               from '@angular/core'

@Pipe({
  name: 'time'
})

export class TimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    
    let val  : string  = '',
        mins : number  = value / 60,
        hrs  : number  = mins / 60,
        isAm : boolean = true
        
    mins = mins % 60
    hrs  = ~~hrs
    if (hrs > 12) {
      isAm = false
      hrs = hrs % 12
    } 

    val  = (hrs < 10 ? '0' + hrs : hrs) + ':' + (mins < 10 ? '0' + mins : mins)
    if (!isAm) val = val + ' PM'
    else val = val + ' AM'
    return val;
  }
}
