/*------------------------------------------------------------------------------
   About      : Routes and API's used in the app
   Created on : Sun Feb 23 2020
   Author     : Yash
------------------------------------------------------------------------------*/


export const ComponentRoutes = {
  ManageSlots : "manageSlots",
  ViewSlots   : "viewSlots",
  BookSlots   : "bookSlots",
  BookingStat : "bookingStatus",
  Landing     : "/"
}

export const ApiEndPoint = {
  AddSlot  : '/api/addSlot',
  GetSlots : '/api/getSlots',
  BookSlot : '/api/bookSlot',
  GetBookedSlots    : '/api/getBookedSlots',
  GetAllBookedSlots : '/api/getAllBookedSlots',
  DeleteSlot : '/api/deleteSlot'
}