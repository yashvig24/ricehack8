const mongoose = require('mongoose');
var User = mongoose.model('User', {
    _id: {
        type: Number,
        required: true
    },
    look_up: {
        type: [Number]
    }
}); 

module.exports.User = User;