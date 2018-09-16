const mongoose = require('mongoose');
var Property = mongoose.model('Property', {
    _id: {
        type: Number,
        required: true
    },
    rent: {
        type: Number
    },
    address: {
        type: String
    },
    high: {
        type: Number
    },
    low: {
        type: Number
    },
    pictures: {
        type: String
    },
    headline: {
        type: String
    },
    bedrooms: {
        Type: Number
    }, 
    bathrooms: {
        Type: Number
    }, 
    area: {
        Type: Number
    }
}); 

module.exports.Property = Property;