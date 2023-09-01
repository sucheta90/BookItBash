const { Schema, model } = require('mongoose');
const venueSchema = require('./Venue');
const imageSchema = require('./Image');

const eventSchema = new Schema({
    // saved event id from Ticketmaster
    eventId: {
        type: String,
        required: true,
        unique: true,
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
    images: [imageSchema],
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
    segements: {
        segementId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },

    },
    genres: {
        genreId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
    },
    subGenres: {
        subGenreId: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
    },

});


const Event = model('Event', eventSchema);

module.exports = Event;