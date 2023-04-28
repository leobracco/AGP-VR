const url = 'ws://192.168.0.10:3000/'
const clientId = 'AGP-VR_' + Math.random().toString(16).substr(2, 8)
const options = {

    clean: true,
    connectTimeout: 4000,
    clientId: clientId
}
const client = mqtt.connect(url, options)
client.on('connect', function () {
    console.log('Connected')
    client.subscribe('/master/estado/motor/#')

})

client.on('message', function (topic, message) {
var datosMQTT = JSON.parse(message);
if($("#idmotor").val()==datosMQTT.idmotor)
    console.log("Topico:"+topic+"-"+message.toString())
    
if($("#idmotor").val()==datosMQTT.idmotor)
      $("#pulsos_cal").val(datosMQTT.pulseCountCal);
       
    if(hasElapsedOneSecond())
    {
	
       
    }
})
let startTime = Date.now();

function hasElapsedOneSecond() {
    let currentTime = Date.now();
    let elapsedTime = currentTime - startTime;

    if (elapsedTime >= 1000) { // 1000 ms = 1 segundo
        startTime = currentTime;
        return true;
    } else {
        return false;
    }
}

$( "#Comenzar" ).click(function() {
     // Envío del mensaje
  const estadoMotor = {
    pwm_manual: $("#calibrar_pwm").val(),
    giros_motor: $("#calibrar_giros").val()
  };

  const mensaje = JSON.stringify(estadoMotor);
  client.publish('/nodo/motor/'+$("#idmotor").val()+'/calibracion', mensaje);
  });
  $( "#Stop" ).click(function() {
    
    
      // Envío del mensaje
  const estadoMotor = {
    pwm_manual: 0,
    giros_motor: 0
  };

  const mensaje = JSON.stringify(estadoMotor);
  client.publish('/nodo/motor/'+$("#idmotor").val()+'/calibracion/stop', mensaje);
  });
  $( "#Grabar" ).click(function() {
    alert( "Grabar." );
  });
  $( "#calibrar_muestra" ).change(function() {
    console.log("Dosis en KG:"+$(this).val());
    console.log("Pulsos:"+$("#pulsos_cal").val());
    $("#dosis_pulso").val($(this).val()/$("#pulsos_cal").val())
    
  });
  
