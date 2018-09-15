var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const {neighbors} = require('./getNeighbors');
const parseXml = require('@rgrove/parse-xml');
var parseString = require('xml2js').parseString;
const mongoost = require('')


const {getAddress} = require('./geocode');
const {getDeets} = require('./buildingData');

var app = express();
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

app.listen(port, async () => {
    console.log('started on port ' + port);
});

app.post('/building/:lat/:lng/:deg', async (req, res) => {
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
            parseString(xml, function (err, result) {
                console.log(result);
                var complete = {};
                complete['street_address'] = result['SearchResults:searchresults'].request[0].address[0];
                complete['useCode'] = result['SearchResults:searchresults'].response[0].results[0].result[0].useCode[0];
                complete['rentzestimate'] = result['SearchResults:searchresults'].response[0].results[0].result[0].rentzestimate[0].amount[0]['_'];
                complete['low'] = result['SearchResults:searchresults'].response[0].results[0].result[0].rentzestimate[0].valuationRange[0].low[0]['_'];
                complete['low'] = result['SearchResults:searchresults'].response[0].results[0].result[0].rentzestimate[0].valuationRange[0].high[0]['_'];
                res.send(complete);
            });
        });
    })
    .catch((e) => {
        console.log(e);
    });
});