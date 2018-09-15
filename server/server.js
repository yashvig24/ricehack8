var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const {neighbors} = require('./functions/getNeighbors');
var parser = require('fast-xml-parser');
const {mongoose} = require('./db/mongoose');
const {connect} = require('./db/mongoose');
const {getAdvDeets} = require('./functions/advDeets');

const {getAddress} = require('./functions/geocode');
const {getDeets} = require('./functions/buildingData');

const user_id = 1;

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log('started on port ' + port);
    await connect();
});

app.get('/building/:lat/:lng/:deg', async (req, res) => {
    neighbors(req.params.lat, req.params.lng, req.params.deg)
    .then((result) => {
        var address = result;
        console.log(address);
        var addressParts = address.split(',');
        var street = addressParts[0].trim();
        var city = addressParts[1].trim() + "," + addressParts[2].trim().split(" ")[0];
        getDeets(street, city)
        .then((deets) => {
            var xml = deets.body;
            var jsonObj = parser.parse(xml);
            console.log("\n");
            console.log(jsonObj);
            console.log("\n");
            complete = {};
            if(jsonObj['SearchResults:searchresults'].message.code != 508) {
                try {
                    complete['address'] = jsonObj['SearchResults:searchresults'].request.address;
                }
                catch(e) {}
                try {
                    zpidArr = jsonObj['SearchResults:searchresults'].response.results.result;
                }
                catch(e) {
                    return res.send(complete);
                }
                zpid = 0;
                if(zpidArr instanceof Array) {
                    console.log('array');
                    zpid = zpidArr[0].zpid;
                    complete['rent'] = jsonObj['SearchResults:searchresults'].response.results.result[0].rentzestimate.amount;
                    complete['valuation'] = jsonObj['SearchResults:searchresults'].response.results.result[0].zestimate.amount;
                }
                else {
                    zpid = zpidArr.zpid;
                    complete['rent'] = jsonObj['SearchResults:searchresults'].response.results.result.rentzestimate.amount;
                    complete['valuation'] = jsonObj['SearchResults:searchresults'].response.results.result.zestimate.amount;
                }
                console.log(zpid);
                getAdvDeets(zpid)
                .then((advdeets) => {
                    var advxml = advdeets.body;
                    var advobj = parser.parse(advxml);
                    // complete['pictures']
                    try {
                    complete['bedrooms'] = advobj["UpdatedPropertyDetails:updatedPropertyDetails"].response.editedFacts.bedrooms;
                    }
                    catch(e) {
                        complete['bedrooms'] = "";
                    }
                    try {
                    complete['bathrooms'] = advobj["UpdatedPropertyDetails:updatedPropertyDetails"].response.editedFacts.bedrooms;
                    }
                    catch(e) {
                        complete['bathrooms'] = "";
                    }
                    try {
                    complete['area'] = advobj["UpdatedPropertyDetails:updatedPropertyDetails"].response.editedFacts.finishedSqFt;
                    }
                    catch(e) {
                        complete['area'] = "";
                    }
                    try {
                    complete['headline'] = advobj["UpdatedPropertyDetails:updatedPropertyDetails"].response.editedFacts.homeDescription;
                    }
                    catch(e) {
                        complete['headline'] = "";
                    }
                    try {
                    complete['pictures'] = advobj["UpdatedPropertyDetails:updatedPropertyDetails"].response.images.image.url;
                    }
                    catch(e) {
                        complete['pictures'] = [];
                    }
                    try {
                    complete['numFloors'] = advobj["UpdatedPropertyDetails:updatedPropertyDetails"].response.editedFacts.numFloors;
                    }
                    catch(e) {
                        complete['numFloors'] = "";
                    }
                    res.send(complete);
                })
            }
            else
                res.send(complete);
        });
    })
    .catch((e) => {
        console.log(e);
    });
});