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
    complex_name: {

    },
    bedrooms: {

    }
}); 

module.exports.Property = Property;