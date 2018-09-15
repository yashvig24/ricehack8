const mongoose = require('mongoose');
var Searcher = mongoose.model('Searcher', {
    _id: {
        type: Number,
        required: true
    },
    age: {
        type: Number
    },
    look_up: {
        type: [Number]
    }
}); 

module.exports.Searcher = Searcher;