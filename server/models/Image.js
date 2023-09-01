const { Schema } = require('mongoose');

// This is a subdocument schema, it's not it's own model 
const imageSchema = new Schema({
    ratio: {
        type: String,
    },
    link: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
    },
    width: {
        type: Number,
    },
    fallback: {
        type: Boolean,
    },

});

module.exports = imageSchema;