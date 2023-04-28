const dgram = require('dgram');

// Crea un socket UDP
const socket = dgram.createSocket('udp4');

// Une el socket al puerto en el que quieres escuchar
const PORT = 8888;
socket.bind(PORT);

// Escucha los paquetes que llegan al socket
socket.on('message', (msg, rinfo) => {
    // Convierte los datos recibidos a un array de bytes
    const data = Array.from(msg);

    // Analiza los datos para obtener los diferentes campos de la estructura
    const headerLo = data[0];
    const headerHi = data[1];
    const modSenId = data[2];
    const relayLo = data[3];
    const relayHi = data[4];
    const rateSetLo = data[5];
    const rateSetMid = data[6];
    const rateSetHi = data[7];
    const flowCalLo = data[8];
    const flowCalMid = data[9];
    const flowCalHi = data[10];
    const command = data[11];
    const powerRelayLo = data[12];
    const powerRelayHi = data[13];
    const manualPwmLo = data[14];
    const manualPwmHi = data[15];
    const crc = data[16];

    // Haz lo que necesites con los datos recibidos
    console.log('Mensaje recibido:', {
        headerLo,
        headerHi,
        modSenId,
        relayLo,
        relayHi,
        rateSetLo,
        rateSetMid,
        rateSetHi,
        flowCalLo,
        flowCalMid,
        flowCalHi,
        command,
        powerRelayLo,
        powerRelayHi,
        manualPwmLo,
        manualPwmHi,
        crc,
        rinfo  // información sobre el remitente del mensaje (dirección IP y puerto)
    });
});

// Maneja los errores que puedan ocurrir
socket.on('error', (err) => {
    console.error('Error en el socket:', err);
});

// Escucha el evento "listening" para saber cuándo el socket está listo para recibir paquetes
socket.on('listening', () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
