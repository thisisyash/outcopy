const express = require('express');
const app  = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

const appDir = '../outplay_app/dist/outplay'


//Application In memory variables
var bookedSlots = []
var currSlots   = []
var slotId      = 1

console.log(`### Starting up Node`)

app.use(cors());
app.use(bodyParser.json())

//POST Request- Adds a slot
app.post('/api/addSlot', function (req, res) {

   let slot = req.headers['slotdet'] 

   if (!slot) {
      res.send({errorCode : 'INVALID_SLOT_DET', errorMsg : 'Missing slot details'})
      return
   } 

   slot = JSON.parse(slot)
   slot['slotId'] = slotId
   console.log('Api call : add new slot : ', slot)
   currSlots.push(slot)
   slotId++
   res.send({})
})

app.post('/api/bookSlot', function(req, res) {

   let slot = req.headers['slotdet']

   if (!slot) {
      res.send({errorCode : 'INVALID_SLOT_DET', errorMsg : 'Missing slot details'})
      return
   } 

   slot = JSON.parse(slot)
   console.log('Api call : booking new slot : ', slot)
   bookedSlots.push(slot)
   res.send({})
})


app.post('/api/deleteSlot', function(req, res) {

   let slotId = req.headers['slotid']

   if (!slotId) {
      res.send({errorCode : 'INVALID_SLOT_DET', errorMsg : 'Missing slot details'})
      return
   } 

   slotId = JSON.parse(slotId)
   console.log('Api call : deleting  slot : ', slotId)
   currSlots = currSlots.filter(slot => slot['slotId'] !== slotId)
   res.send({})
})

//GET Request - return the slots
app.get('/api/getSlots',  function(req, res) {

   console.log('Api call : get slots')
   const resp = {
      slots : currSlots
   }
   res.send(resp)
})

//GET Request - returns all booked slots
app.get('/api/getAllBookedSlots', function(req, res) {

   console.log('Api call : get all booked slots')
   const resp = {
      bookedSlots : bookedSlots
   }
   res.send(resp)
})

//GET Request - returns booked slot of a day
app.get('/api/getBookedSlots', function(req, res) {

   const dayTs = req.headers['dayts']
   const resp = {
      bookedSlots : bookedSlots.filter(slot => slot.dayTs == dayTs)
   }
   res.send(resp)
})


// *** Serve Angular app from dist folder ***
// Serve static content files, and redirect everything else to index.html
app.use(express.static(appDir));
app.get('*', function (req, res) {
    res.sendFile(path.resolve(`${appDir}/index.html`))
});

// Start the server
var port = process.env.PORT || 4200;
app.listen(port, function () {
   console.log(`### Server and API listening on port ${port}`)
   console.log('### Open http://localhost:4000 to use Outplay meeting app')
});


// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

function createError() {
   console.log("file not found")
}
// error handler
app.use(function (err, req, res, next) {
 console.error(err.message); 
 if (!err.statusCode) err.statusCode = 500 
 res.status(err.statusCode).send(err.message)
});

// ------------ Util functions from here ------------- //
