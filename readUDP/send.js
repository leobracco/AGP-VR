'use strict'

const mqtt = require('mqtt')

const PORT = 1883

const options = {
  port: PORT
  
}

const client = mqtt.connect(options)


client.publish('/agos', 'Current time is: ' + new Date())

