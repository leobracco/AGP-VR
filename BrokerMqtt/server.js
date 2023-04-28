var mosca = require('mosca');

var mdns = require('mdns-js');

console.log('should advertise a http service on port 1883');
var service = mdns.createAdvertisement(mdns.tcp('_mqtt'), 1883, {
  name:'hello',
  txt:{
    txtvers:'1'
  }
});
service.start();

var moscaSetting = {
    interfaces: [
        { type: "mqtt", port: 1883 },
        { type: "http", port: 3000, bundle: true },
       
    ],
    stats: false,
    onQoS2publish: 'noack', // can set to 'disconnect', or to 'dropToQoS1' if using a client which will eat puback for QOS 2; e.g. mqtt.js

    
};

var server = new mosca.Server(moscaSetting);

server.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
    console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}