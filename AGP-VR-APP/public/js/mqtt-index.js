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
    //console.log(datosMQTT.DOSIS_POR_HA+"-"+datosMQTT.input+"-"+datosMQTT.SetPoint);
    var kgha=parseFloat(datosMQTT.DOSIS_POR_HA)*parseFloat(datosMQTT.input)/parseFloat(datosMQTT.SetPoint);
    $("#motor"+datosMQTT.idmotor).html(kgha.toFixed(2)+"Kg de "+datosMQTT.DOSIS_POR_HA+"Kg");
    console.log($("#dosis_ha_"+datosMQTT.idmotor).val())
    if ($("#dosis_ha_"+datosMQTT.idmotor).val()=='')
    $("#dosis_ha_"+datosMQTT.idmotor).val(datosMQTT.DOSIS_POR_HA);
    if ($("#manual_"+datosMQTT.idmotor).val()=='')
    $("#manual_"+datosMQTT.idmotor).val((datosMQTT.modo))
    if ($("#pwm_m"+datosMQTT.idmotor+"_value").val()=='')
    $("#pwm_m"+datosMQTT.idmotor+"_value").val((datosMQTT.pwm_manual))
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

$("#Dosis_Motor_1").click(function() {
    
    alert( $("#manual_1").val());
    const MotorConfig = {
        dosis_ha: $("#dosis_ha_1").val(),
        modo: $("#manual_1").val(),
        pwm_manual: $("#pwm_m1_value").val()
    };

    const mensaje = JSON.stringify(MotorConfig);
    client.publish('/nodo/motor/1/dosis', mensaje);
});
$("#Dosis_Motor_2").click(function() {
    
    const MotorConfig = {
        dosis_ha: $("#dosis_ha_2").val(),
        modo: $("#manual_2").val(),
        pwm_manual: $("#pwm_m2_value").val()
    };

    const mensaje = JSON.stringify(MotorConfig);
    client.publish('/nodo/motor/2/dosis', mensaje);
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
