/*------------------------------------------------------------------------------
   About      : Type specifics in the app
   Created on : Sun Feb 23 2020
   Author     : Yash
------------------------------------------------------------------------------*/


export type UnionKeyToValue<U extends string> = {
  [K in U]: K
}

export type USER_ACTION   = 'VIEWSLOTS' | 'MANAGESLOTS' | 'BOOKSLOTS'
export const USER_ACTION  : UnionKeyToValue<USER_ACTION> = {
  VIEWSLOTS   : 'VIEWSLOTS',
  MANAGESLOTS : 'MANAGESLOTS',
  BOOKSLOTS   : 'BOOKSLOTS'
}

export interface Slot {
  slotId   ?: number
  userName ?: string
  startTs   : number
  endTs     : number
  slotDay   : DAY
}

export interface BookedSlot {
  dayTs    : number
  slotId   : number
  userName : string
}

export type DAY  = "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY"
export const DAY : UnionKeyToValue<DAY> = {
  SUNDAY    : 'SUNDAY',
  MONDAY    : 'MONDAY',
  TUESDAY   : 'TUESDAY',
  WEDNESDAY : 'WEDNESDAY',
  THURSDAY  : 'THURSDAY',
  FRIDAY    : 'FRIDAY',
  SATURDAY  : 'SATURDAY'
}

export type STATUS = "SUCCESS" | "FAILURE"
export const STATUS : UnionKeyToValue<STATUS> = {
  FAILURE : 'FAILURE',
  SUCCESS : 'SUCCESS'
}