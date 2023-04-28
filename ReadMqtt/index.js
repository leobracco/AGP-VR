'use strict'

const mqtt = require('mqtt')

const PORT = 1883

const options = {
  port: PORT
  
}

const client = mqtt.connect(options)

client.subscribe('#')
//client.publish('/master/1', 'Current time is: ' + new Date())

client.on('message', function (topic, message) {
  
 // var datosMQTT = JSON.parse(message);
  console.log('Received Message:= ' + message  + '\nOn topic:= ' + topic)
  //console.log('Toma:= ' + datosMQTT.nserie + '\nOn topic:= ' + topic)
})