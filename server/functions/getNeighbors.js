const request = require('request');
var neighbors = function(lat,lng,deg) {
    String.prototype.format = function () {
        var i = 0, args = arguments;
        return this.replace(/{}/g, function () {
            return typeof args[i] != 'undefined' ? args[i++] : '';
        });
    };
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng={}&key=AIzaSyAHaqvwL3F9opLHduS3fYIdh6rtSqtnr6A";
    url = url.format(lat + "," + lng);
    console.log(url);
    return new Promise((resolve, reject) => {
        request({
            url: url
        }, (error, response, body) => {
            if(error) {
                reject('Connectivity error');
            } 
            lat = lat *1000;
            lng = lng*1000;
            var response = response.body;
            var response = JSON.parse(response);
            var results = response.results;
            var minDiff = 180;
            for(let i = 0; i < results.length; i++) {
                result = results[i];
                var newlat = result.geometry.location.lat * 1000;
                var newlng = result.geometry.location.lng * 1000;
                var hieght_diff = Math.abs(newlat - lat);
                var dist = Math.sqrt(Math.pow(hieght_diff, 2) + Math.pow(newlng - lng, 2));
                var direction = 0;
                if (newlat >= lat) {
                    if(newlng >= lng) {
                        direction = Math.acos(hieght_diff/dist);
                    }
                    else {
                        direction = 360 - Math.acos(hieght_diff/dist);
                    }
                }
                else {
                    if(newlng >= lng) {
                        direction = 180 - Math.acos(hieght_diff/dist);
                    }
                    else {
                        direction = 180 + Math.acos(hieght_diff/dist);
                    }
                }
                var diff = 0;
                diff = Math.abs(deg - direction);
                if(diff > 180)
                    diff = 360 - diff;
                console.log(diff + ", " + result.formatted_address);
                if(diff < minDiff && !isNaN(result.formatted_address.split(" ")[0])) {
                    minDiff = diff;
                    best = result.formatted_address;
                }
            }

            // var bearing = function(lat1,lng1,lat2,lng2) {
            //     var dLon = (lng2-lng1);
            //     var y = Math.sin(dLon) * Math.cos(lat2);
            //     var x = Math.cos(lat1)*Math.sin(lat2) - Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
            //     var brng = toDeg(Math.atan2(y, x));
            //     return 360 - ((brng + 360) % 360);
            // }

            // var toRad  = function(deg) {
            //     return deg * Math.PI / 180;
            // }

            // var toDeg = function(rad) {
            //     return rad * 180 / Math.PI;
            // }
            // minDeg = 180;
            // best = "";
            // for(let i = 0; i < results.length; i++) {
            //     var result = results[i];
            //     var newlat = result.geometry.location.lat;
            //     var newlng = result.geometry.location.lng;
            //     var newdeg = bearing(newlat, newlng, lat, lng);
            //     var degdiff = Math.abs(newdeg - deg);
            //     if(degdiff > 180)
            //         degdiff = 360 - degdiff;
            //     if(degdiff < minDeg && !isNaN(result.formatted_address.split(" ")[0])) {
            //         minDef = degdiff;
            //         best = result.formatted_address;
            //     }
            //     console.log(degdiff + ", " + result.formatted_address);
            // }
            resolve(best);
        });
    });
}

module.exports.neighbors = neighbors;