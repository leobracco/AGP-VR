var debug = false;

function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
//localDB.put(doc);


var localDB = new PouchDB('cemento')
var remoteDB = new PouchDB('https://admin:password@ip/cemento');
localDB.sync(remoteDB, {
    live: true,
    retry: true
}).on('change', function(change) {
    // yo, something changed!
}).on('error', function(err) {
    // yo, we got an error! (maybe the user went offline?)
});

function getFormattedDate() {
    var date = new Date();
    var str = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " " + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();

    return str;
}


function Save(obj) {
    //alert("SAVE TEST");
    if (debug)
        console.log('Latitud:' + startPos.coords.latitude + " Longitud:" + startPos.coords.longitude);
    //alert(startPos.coords.latitude);
    var doc = {
        "_id": create_UUID(),
        "tag": $("#" + obj.getAttribute("tag")).attr("tag"),
        "tag_user": $("#" + obj.getAttribute("tag")).attr("tag_user"),
        "seccion": $("#" + obj.getAttribute("tag")).attr("seccion"),
        "equipo": $("#" + obj.getAttribute("tag")).attr("equipo"),
        "type": $("#" + obj.getAttribute("tag")).attr("tipodedato"),
        "device": $("#" + obj.getAttribute("tag")).attr("device"),
        "min": $("#" + obj.getAttribute("tag")).attr("min"),
        "max": $("#" + obj.getAttribute("tag")).attr("max"),
        "value": $("#" + obj.getAttribute("tag")).val(),
        "latiud": startPos.coords.latitude,
        "longitud": startPos.coords.longitude,
        "date": Date.now()

    };

    if ($("#" + obj.getAttribute("tag")).attr("tipodedato") == "number")
        if (
            parseFloat($("#" + obj.getAttribute("tag")).val()) >
            parseFloat($("#" + obj.getAttribute("tag")).attr("min")) &&
            $("#" + obj.getAttribute("tag")).val() <
            parseFloat($("#" + obj.getAttribute("tag")).attr("max"))) {
            localDB.put(doc);
            $("#" + obj.getAttribute("tag")).prop("disabled", true);
            obj.setAttribute("onclick", "");
            $('#logoutModal').find('.modal-title').text($("#" + obj.getAttribute("tag")).attr("name"));
            $('#logoutModal').find('.modal-body').text("El valor ingresado se a grabado correctamente");
            $('#logoutModal').modal('show');

        } else {
            $('#logoutModal').find('.modal-title').text($("#" + obj.getAttribute("tag")).attr("name"));
            $('#logoutModal').find('.modal-body').text("El valor ingresado no esta dentro de los min/max sugeridos: " + $("#" + obj.getAttribute("tag")).attr("min") + "/" + $("#" + obj.getAttribute("tag")).attr("max") + " " + $("#" + obj.getAttribute("tag")).attr("unit"));
            $('#logoutModal').modal('show');
        }
}