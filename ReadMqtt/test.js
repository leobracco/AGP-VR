const dgram = require('dgram');
const socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });

const BROADCAST_ADDR = '192.168.1.255';
const PORT = 5000;

socket.bind(() => {
    socket.setBroadcast(true); // Habilita la transmisión a difusión
});

function sendMessage(message) {
    const buffer = Buffer.from(message);
    socket.send(buffer, 0, buffer.length, PORT, BROADCAST_ADDR);
}

// Uso de ejemplo: enviar un mensaje cada 5 segundos
setInterval(() => {
    sendMessage('Hello from client');
}, 17777);
