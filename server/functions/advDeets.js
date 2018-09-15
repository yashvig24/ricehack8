const request = require('request');
var getAdvDeets = function(zpid) {
    String.prototype.format = function () {
        var i = 0, args = arguments;
        return this.replace(/{}/g, function () {
            return typeof args[i] != 'undefined' ? args[i++] : '';
        });
    };

    var key = "X1-ZWz1gnbtmz6423_5upah";
    var url = " http://www.zillow.com/webservice/GetUpdatedPropertyDetails.htm?zws-id={}&zpid={}"
    url = url.format(key, zpid);
    console.log(url);
    return new Promise((resolve, reject) => {
        request({
            url: url
        }, (error, response, body) => {
            if(error) {
                reject('Connectivity error');
            } 
            resolve(response);
        });
    });
}

module.exports.getAdvDeets = getAdvDeets;