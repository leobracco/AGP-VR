const dgram = require('dgram');

const server = dgram.createSocket('udp4');

const PORT = 5123;

server.on('listening', () => {
    const address = server.address();
    console.log(`Servidor UDP escuchando en ${address.address}:${address.port}`);
});

server.on('message', (message, remote) => {
    console.log(`Mensaje recibido desde ${remote.address}:${remote.port}: ${message.toString('hex')}`);
});

server.bind(PORT);
