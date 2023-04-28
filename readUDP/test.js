/*const dgram = require('dgram');
const client = dgram.createSocket('udp4');


const portMy = 5123;
const ipDestination = '192.168.1.255';
const portDestination = 9999;

const helloFromMachine = new Uint8Array([128, 129, 123, 123, 5, 0, 0, 0, 0, 0, 71]);
const message = Buffer.from(helloFromMachine);
// Enviar mensaje UDP al servidor
client.send(message,  portDestination, ipDestination, (error, ) => {
    if (error) throw error;

    console.log(`Mensaje enviado al servidor: ${message}`);
});

// Esperar respuesta del servidor
client.on('message', (msg, rinfo) => {
    console.log(`Respuesta del servidor recibida: ${msg} de ${rinfo.address}:${rinfo.port}`);
});

// Enlazar el cliente al puerto local especificado
client.bind(portMy, () => {
    console.log(`El cliente está escuchando en el puerto ${portMy}`);
});

*/
/************************************************** */

const dgram = require('dgram');
const portMy = 5123;
const client = dgram.createSocket('udp4');

const helloFromMachine = new Uint8Array([128, 129, 123, 123, 5, 0, 0, 0, 0, 0, 71]);
const message = Buffer.from(helloFromMachine);

const serverIP = '192.168.1.255';
const serverPort = 9999;
funcionConRetraso();
function funcionConRetraso()
{
    
client.send(message, serverPort, serverIP, (err) => {
    if (err) throw err;
    console.log('Mensaje enviado con éxito');

    
});
    setTimeout(funcionConRetraso, 1000);
}

client.on('listening', () => {
    console.log(`Escuchando en el puerto ${portMy}`);
});


client.on('message', (msg, rinfo) => {
    //console.log(`Received ${msg.length} bytes from ${rinfo.address}:${rinfo.port}`);

    // Comprobar que la cabecera sea válida
    if (msg[0] !== 128 || msg[1] !== 129) {
        console.log('Cabecera inválida');
        return;
    }

 
     // Comprobar la longitud del mensaje
     if (msg.length !== 16) {
         console.log('Longitud inválida');
         return;
     }
 
     // Analizar los datos
     const rates = [];
     for (let i = 0; i < 5; i++) {
         const lo = msg[i * 2 + 5];
         const hi = msg[i * 2 + 6];
         rates.push(lo + hi * 256);
     }
     
    switch (msg[3]) {
        case 230:
            console.log('PGN 230');
            break;
        case 234:
            console.log('PGN 234');
            break;
        case 235:
            console.log('PGN 235');
            break;
        case 236:
            console.log('PGN 236');
            break;
        case 239:
            console.log('PGN 239');

            const uTurn = msg[5];
            const speed = msg[6];
            const section1 = msg[11];
            const section2 = msg[12];

            obtenerSeccionesActivas(section1, 1);
            obtenerSeccionesActivas(section2, 2);
            client.publish('/nodos/secciones', jsonOBJ);
            //console.log(`Received AutoSteer Data: urutn=${(uTurn)}, speed=${(speed)} section1=${(section1)} section2=${(section2)}`);
            break;
        case 254:
            console.log('PGN 254');
            const headerHi = msg[0];
            const headerLo = msg[1];
            const source = msg[2];
            const agioPgn = msg[3];
            const length = msg[4];
            const speedLo = msg[5];
            const speedHi = msg[6];
            const status = msg[7];
            const steerAngleLo = msg[8];
            const steerAngleHi = msg[9];
            const relayLo = msg[11];
            const relayHi = msg[12];
            const crc = msg[13];
            seccionesStatus["velocidad"] = (speedHi << 8 | speedLo) / 10;
            //console.log(`Received AutoSteer Data: speed=${(speedHi << 8 | speedLo) / 10}km/h, status=${status}, steerAngle=${(steerAngleHi << 8 | steerAngleLo)}, relays=${(relayHi << 8 | relayLo).toString(2)}`);
            break;
        case 32501:
            console.log('PGN 32501');
            break;
        default:
            console.log('Lo lamentamos, por el momento no disponemos de ' + msg[3] + '.');
    }

    //console.log(`Rates: ${rates}`);
});