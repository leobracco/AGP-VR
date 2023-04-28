const url = 'ws://localhost:3000/'
const options = {

    clean: true,
    connectTimeout: 4000,
    clientId: 'AGP-VR'
}
const client = mqtt.connect(url, options)
client.on('connect', function () {
    console.log('Connected')
    client.subscribe('/master/estado/motor/#')

})

client.on('message', function (topic, message) {
    //console.log(message.toString())
    
       
})
let startTime = Date.now();

function hasElapsedOneSecond() {
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    if (elapsedTime >= 500) { // 1000 ms = 1 segundo
        startTime = currentTime;
        return true;
    } else {
        return false;
    }
}