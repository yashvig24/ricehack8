var mongoose = require('mongoose');

// how mongoose handles promises
mongoose.Promise = global.Promise;

//const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/Recom";
const mongoUrl = "";
async function connect() {
    return mongoose.connect(mongoUrl, { useNewUrlParser: true})
}

module.exports.mongoose = mongoose;
module.exports.connect = connect;