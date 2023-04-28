var startPos;
window.onload = function() {

    var geoOptions = {
        maximumAge: 5 * 60 * 1000,
    }

    var geoSuccess = function(position) {
        startPos = position;


        console.log('Latitud:' + startPos.coords.latitude + " Longitud:" + startPos.coords.longitude);

    };
    var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);

        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
    };
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};