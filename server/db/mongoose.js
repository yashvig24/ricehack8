var mongoose = require('mongoose');

// how mongoose handles promises
mongoose.Promise = global.Promise;

//const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/Recom";
const mongoUrl = "mongodb://hackrice:hackrice1@ds157742.mlab.com:57742/heroku_k99gkgvm";
async function connect() {
    return mongoose.connect(mongoUrl, { useNewUrlParser: true})
}

module.exports.mongoose = mongoose;
module.exports.connect = connect;