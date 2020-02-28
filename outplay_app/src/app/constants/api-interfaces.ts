import { BookedSlot, 
         Slot 
       }                         from './app-types'

export namespace GetBookedSlots {


  export type params = {


  }

  export type response = {
    bookedSlots : BookedSlot[]
  }
}


export namespace GetSlots {

  export type params = {

  }

  export type response = {
    slots : Slot[]
  }
}
