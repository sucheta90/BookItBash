const { Schema } = require('mongoose');

// This is a subdocument schema, it's not it's own model 
const venueSchema = new Schema({
// saved venue id from Ticketmaster
venueId: {
    type: String,
    required: true,
},
name: {
    type: String,
    required: true,
},
type: {
    type: String,
},
address: {
    type: String,
    required: true,
},
cityName: {
    type: String,
    required: true,
},
stateName: {
    type: String,
    required: true,
},
stateCode: {
    type: String,
    required: true,
},


});


module.exports = venueSchema;