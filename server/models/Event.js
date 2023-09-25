const { Schema, model } = require('mongoose');
const venueSchema = require('./Venue');
const imageSchema = require('./Image');

const eventSchema = new Schema({
    // saved event id from Ticketmaster
    eventId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    venue: [venueSchema],
    image: [imageSchema],
    ticketLink: {
        type: String,
        required: true,
    },
    priceRangeMin: {
        type: Number,
    },
    priceRangeMax: {
        type: Number,
    },
    segment: {
        segmentId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },

    },
    genre: {
        genreId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
    },
    subGenre: {
        subGenreId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
    },
    date: {
        type: String,
    },

});


const Event = model('Event', eventSchema);

module.exports = Event;