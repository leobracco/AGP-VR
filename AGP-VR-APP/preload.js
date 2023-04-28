const {
  contextBridge,
  ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  grabarConfig: (json) => ipcRenderer.send('grabar-config', json),
  leerConfig: (file) => ipcRenderer.send('loadJsonData', file)
})


function leerConfigLoad(callback) {
  ipcRenderer.on('jsonDataLoaded', (event, jsonData) => {
      
      callback(jsonData);
  });
}


leerConfigLoad((jsonData) => {

  var datosMQTT = JSON.parse(jsonData);

  switch (datosMQTT.type) {
      case "parametros":
          // Json a grabar
          console.log("Entra en prametros");


          var Input_pwm_minimo = document.getElementById("pwm_minimo")
          Input_pwm_minimo.value = datosMQTT.pwm_minimo;
          var Input_pwm_maximo = document.getElementById("pwm_maximo")
          Input_pwm_maximo.value = datosMQTT.pwm_maximo;
          var Input_KP = document.getElementById("KP")
          Input_KP.value = datosMQTT.kp;
          var Input_KI = document.getElementById("KI")
          Input_KI.value = datosMQTT.ki;
          var Input_KD = document.getElementById("KD")
          Input_KD.value = datosMQTT.kd;
          var Input_seccion = document.getElementById("seccion")
          Input_seccion.value = datosMQTT.seccion;
          var Input_engranaje = document.getElementById("engranaje")
          Input_engranaje.value = datosMQTT.engranaje;



          break;
      case "calibracion":
        
          var Input_pulsos_cal = document.getElementById("pulsos_cal")
          Input_pulsos_cal.value = datosMQTT.pulsos_cal;
          var Input_calibrar_muestra = document.getElementById("calibrar_muestra")
          Input_calibrar_muestra.value = datosMQTT.calibrar_muestra;
          var Input_dosis_pulso = document.getElementById("dosis_pulso")
          Input_dosis_pulso.value = datosMQTT.dosis_pulso;
          var Input_ancho_labor = document.getElementById("ancho_labor")
          Input_ancho_labor.value = datosMQTT.ancho_labor;
          
          break;
      default:
          console.log("Sin opcion");
  }
});