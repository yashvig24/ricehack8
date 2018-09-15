const request = require('request');

var getAddress = function(lat, lng) {
    String.prototype.format = function () {
        var i = 0, args = arguments;
        return this.replace(/{}/g, function () {
            return typeof args[i] != 'undefined' ? args[i++] : '';
        });
    };

    var key = "AIzaSyAHaqvwL3F9opLHduS3fYIdh6rtSqtnr6A";
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng={}&key={}";
    url = url.format(lat + "," + lng, key);

    return new Promise((resolve, reject) => {
        request({
            url: url,
        }, (error, response, body) => {
            if(error) {
                reject('Connectivity error');
            } 
            response = JSON.parse(response.body);
            resolve(response.results[0].formatted_address);
        });
    });
}

module.exports.getAddress = getAddress;
