const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
const mqtt = require('mqtt')
  
            //UDPaog = new UDPComm(this, 16666, 17777, 16660, "127.0.0.255");       // AGIO
            //UDPaog = new UDPComm(this, 17777, 15555, 1460, "127.255.255.255", true, true);  // AOG

            //UDPmodules = new UDPComm(this, 29999, 28888, 1480 );    // arduino
//const PORT = 17777;
const PORT = 17777;
const client = mqtt.connect('mqtt://127.0.0.1')
socket.on('error', (err) => {
    console.log(`Socket error: ${err.stack}`);
    socket.close();
});
var jsonOBJ,jsonOBJSECCIONES;
const seccionesStatus = {
    seccion1: 0,
    seccion2: 0,
    seccion3: 0,
    seccion4: 0,
    seccion5: 0,
    seccion6: 0,
    seccion7: 0,
    seccion8: 0,
    seccion9: 0,
    seccion10:0,
    seccion11:0,
    seccion12:0,
    seccion13:0,
    seccion14:0,
    seccion15:0,
    seccion16:0,
    veloidad:0

};
var section1 ;
var section2 ;
var section3 ;
var lastVelocidad;
var lastseccion;
socket.on('message', (msg, rinfo) => {
    //console.log(`Received ${msg.length} bytes from ${rinfo.address}:${rinfo.port}`);

    // Comprobar que la cabecera sea v�lida
    if (msg[0] !== 128 || msg[1] !== 129) {
        console.log('Cabecera inv�lida');
        return;
    }

    // Comprobar que el origen y el PGN sean v�lidos
   /* if (msg[2] !== 0 || msg[3] !== 230) {
        console.log('Origen o PGN inv�lidos:'+msg[2]  +"---"+ msg[3]);
        return;
    }

    // Comprobar la longitud del mensaje
    if (msg.length !== 16) {
        console.log('Longitud inv�lida');
        return;
    }

    // Analizar los datos
    const rates = [];
    for (let i = 0; i < 5; i++) {
        const lo = msg[i * 2 + 5];
        const hi = msg[i * 2 + 6];
        rates.push(lo + hi * 256);
    }
    */
    switch (msg[3]) {
        case 200:
            console.log('PGN 200');
            console.log("Tama�o:" + msg.length);
            const dato1= msg[0];
            const dato2 = msg[1];
            const dato3 = msg[2];
            const dato4 = msg[3];
            const dato5 = msg[4];
            const dato6 = msg[5];
            const dato7 = msg[6];
            const dato8 = msg[7];
            const dato9 = msg[8];
            console.log(`Data: ${(dato1)} ${(dato2)} ${(dato3)} ${(dato4)} ${(dato5)} ${(dato6)} ${(dato7)} ${(dato8)} ${(dato9)}`);
            
            break;
        case 229:
            console.log('PGN 229');
            console.log("Tama�o:" + msg.length);
            
             section1 = msg[5];
             section2 = msg[6];
             section3 = msg[7];

            obtenerSeccionesActivas(section1, 1);
            //obtenerSeccionesActivas(section2, 2);
            //obtenerSeccionesActivas(section3, 3);
            //client.publish('/aog/secciones', jsonOBJ);
            console.log(`Received AutoSteer Data: urutn=${(uTurn)}, speed=${(speed)} section1=${(section1)} section2=${(section2)}`);
            break;
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
            //console.log('PGN 239');
            //console.log("Tama�o:" + msg.length);
            
             section1 = msg[11];
             section2 = msg[12];
             section3 = msg[13];
           
            obtenerSeccionesActivas(section1,1);
            //obtenerSeccionesActivas(section2, 2);
            //obtenerSeccionesActivas(section3, 3);
            console.log("Actual:"+section1);
                if (section1!=lastseccion)
                {
                    const data = {
                        seccion: 0
                      };

                    if (section1==1)
                        data.seccion=1
                    else
                        data.seccion=0
                    const payload = JSON.stringify(data);
                    client.publish('/secciones', payload);
                    lastseccion=section1;
                }
            
            console.log(`Received AutoSteer Data:  section1=${(section1)} section2=${(section2)} section2=${(section3)}`);
            break;
        case 254:
           
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
            seccionesStatus["velocidad"] =(speedHi << 8 | speedLo) / 10;

		 jsonOBJ=JSON.stringify({velocidad:seccionesStatus['velocidad']});
		if(seccionesStatus["velocidad"]!=lastVelocidad)
		{
		 client.publish('/tractor/velocidad', jsonOBJ)
		console.log('PGN 254');
		}
		lastVelocidad=seccionesStatus["velocidad"];
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

socket.bind(PORT, () => {
    socket.setBroadcast(true);
    console.log(`Listening on port ${PORT}`);
});

/*socket.bind(() => {
    socket.setBroadcast(true); // Habilita la transmisi�n a difusi�n
});*/

function obtenerSeccionesActivas(num, parte) {
    var secciones;
    
    if (parte == 1)
        secciones = ['seccion', 'seccion2', 'seccion3', 'seccion4', 'seccion5', 'seccion6', 'seccion7', 'seccion8'];
    else {
        if (parte == 2)
            secciones = ['seccion9', 'seccion10', 'seccion11', 'seccion12', 'seccion13', 'seccion14', 'seccion15', 'seccion16'];
        else
            secciones = ['seccion17', 'seccion18', 'seccion19', 'seccion20', 'seccion21', 'seccion22', 'seccion23', 'seccion24'];
    }
    
    for (let i = 0; i < secciones.length; i++) {
        if (num & (1 << i)) {
            
            seccionesStatus[secciones[i]]= 1
        }
        else
            seccionesStatus[secciones[i]] = 0
    }
    
     jsonOBJSECCIONES=JSON.stringify(seccionesStatus);
}





client.on('connect', function () {
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    
})