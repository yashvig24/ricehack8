const mongoose = require('mongoose');
var Property = mongoose.model('Property', {
    _id: {
        type: Number,
        required: true
    },
    lat: {

    },
    lng: {

    },
    rent: {

    },
    address: {

    },
    high: {

    },
    low: {

    },
    pictures: {

    },
    headline: {

    },
    bedrooms: {

    }, 
    bathrooms: {

    }, 
    area {
        
    }
}); 

module.exports.Property = Property;