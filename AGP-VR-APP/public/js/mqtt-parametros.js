const url = 'ws://192.168.0.10:3000/'
const clientId = 'AGP-VR_' + Math.random().toString(16).substr(2, 8)
const options = {

    clean: true,
    connectTimeout: 4000,
    clientId: clientId
}
const client = mqtt.connect(url, options)
client.on('connect', function() {
    console.log('Connected')
    client.subscribe('/master/estado/motor/#')

})

client.on('message', function(topic, message) {
  console.log('Received message:', message.toString())
    var datosMQTT = JSON.parse(message);
    if(hasElapsedOneSecond())
    {
      if( $("#idmotor").val()==datosMQTT.idmotor)
      {
        if ($("#autocal").val()==1)
        {
            $("#KP").val(datosMQTT.KP);
            $("#KI").val(datosMQTT.KI);
            $("#KD").val(datosMQTT.KD);
        }
        var kgha=parseFloat(datosMQTT.DOSIS_POR_HA)*parseFloat(datosMQTT.input)/parseFloat(datosMQTT.SetPoint);
        $("#dosis").html(kgha.toFixed(2)+"Kg de "+datosMQTT.DOSIS_POR_HA+"Kg");
    
        actualizarGrafico(message.toString());
      }
    }

})
client.on('error', function(error) {
  console.error('Error:', error)
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

$("#Prueba").click(function() {
    // Envío del mensaje
    console.log("Prueba");
    const estadoMotor = {
        pwm_manual: $("#pwm_minimo").val(),
        giros_motor: 5
    };

    const mensaje = JSON.stringify(estadoMotor);
    client.publish('/nodo/motor/' + $("#idmotor").val() + '/pwm_minimo', mensaje);
});
$("#autocal").change(function() {
    // Envío del mensaje
    if($("#autocal").val()==1)
    console.log("AUTOCAL TRUE:"+$("#autocal").val())
    else
    console.log("AUTOCAL FALSE:"+$("#autocal").val())
    const estadoMotor = {
        auto: $("#autocal").val()
    };

    const mensaje = JSON.stringify(estadoMotor);
    client.publish('/nodo/motor/' + $("#idmotor").val() + '/parametros/autocal', mensaje);
});
$("#Stop").click(function() {


    // Envío del mensaje
    const estadoMotor = {
        pwm_manual: 0,
        giros_motor: 0
    };

    const mensaje = JSON.stringify(estadoMotor);
    client.publish('/nodo/motor/' + $("#idmotor").val() + '/calibracion/stop', mensaje);
});
$("#Grabar").click(function() {
    alert("Grabar.");
});
$("#calibrar_muestra").change(function() {
    console.log("Dosis en KG:" + $(this).val());
    console.log("Pulsos:" + $("#pulsos_cal").val());
    $("#dosis_pulso").val($(this).val() / $("#pulsos_cal").val())

});


  // Configurar el gráfico
// Selecciona el contenedor HTML para el gráfico
var grafico = document.getElementById('grafico');

// Define los datos iniciales para el gráfico
var datos = [{
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines',
    name: 'Setpoint'
}, {
    x: [],
    y: [],
    type: 'scatter',
    mode: 'lines',
    name: 'Input'
}];

// Define las opciones para el gráfico
var opciones = {
    margin: { t: 0 },
    legend: { orientation: 'h' }
};

// Crea el gráfico utilizando Plotly.js
Plotly.newPlot(grafico, datos, opciones);

// Función para procesar los datos MQTT recibidos y actualizar el gráfico
function actualizarGrafico(mensaje) {
    // Convierte el mensaje JSON recibido en un objeto JavaScript
    var datosMQTT = JSON.parse(mensaje);

    // Agrega los nuevos datos al gráfico
    Plotly.extendTraces(grafico, { x: [[new Date()]], y: [[datosMQTT.SetPoint]] }, [0]);
    Plotly.extendTraces(grafico, { x: [[new Date()]], y: [[datosMQTT.input]] }, [1]);
}