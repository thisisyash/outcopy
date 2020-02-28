import { Injectable }               from '@angular/core'
import { Slot, 
         BookedSlot,
         ApiEndPoint
       }                            from '../constants'
import { HttpClient }               from '@angular/common/http'
import { GetSlots }                 from '../constants/api-interfaces'

@Injectable({
  providedIn: 'root'
})

export class DbService {

  days : string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY','FRIDAY', 'SATURDAY']


  constructor(private httpClient : HttpClient) { 

  }

  async addSlot(slot : Slot) : Promise<Object> {

    const resp = await this.httpClient.post(ApiEndPoint.AddSlot, '', { headers : { slotdet : JSON.stringify(slot)}}).toPromise()
    return resp
  }

  async getSlots() : Promise<any> {
    
    const resp = await this.httpClient.get(ApiEndPoint.GetSlots).toPromise()
    return resp
  }

  async bookSlot(slot : BookedSlot) {

    if (!slot) return
    const resp = await this.httpClient.post(ApiEndPoint.BookSlot, '', { headers : { slotdet : JSON.stringify(slot)}}).toPromise()
    return resp
  }

  async getBookedSlots(dayTs : number) : Promise<any> {

    const resp = await this.httpClient.get(ApiEndPoint.GetBookedSlots, { headers : { dayts : JSON.stringify(dayTs)}}).toPromise()
    return resp
  }

  async getAllBookedSlots() : Promise<any> {
  
    const resp = await this.httpClient.get(ApiEndPoint.GetAllBookedSlots).toPromise()
    return resp
  }

  async getDaySlots(dayIndex : number) : Promise<Slot[]> {
    const currSlots = await this.getSlots() as GetSlots.response
    return currSlots.slots.filter(slot => slot.slotDay === this.days[dayIndex])
  }

  async deleteSlot(slotId : number) : Promise<any> {

    const resp = await this.httpClient.post(ApiEndPoint.DeleteSlot,'', { headers : { slotId : JSON.stringify(slotId)}}).toPromise()
    return resp
  }
}
