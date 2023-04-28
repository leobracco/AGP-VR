const titleInput = document.getElementById('title')
const grabarconfig = document.getElementById('grabar-config')
const leerconfig = document.getElementById('idmotor')


if (grabarconfig) {
	grabarconfig.addEventListener('click', () => {
		// Crear un objeto JSON

		switch ($("#file").val()) {
			case "parametros":
				// Json a grabar
				const Parametros = {
					type: $("#file").val(),
					nombre: "./" + $("#file").val() + "-" + $("#idmotor").val() + ".json",
					pwm_minimo: $("#pwm_minimo").val(),
					pwm_maximo: $("#pwm_maximo").val(),
					kp: $("#KP").val(),
					ki: $("#KI").val(),
					kd: $("#KD").val(),
					seccion: $("#seccion").val(),
					engranaje: $("#engranaje").val()
				};

				const jsonData = JSON.stringify(Parametros);
        client.publish('/nodo/motor/' + $("#idmotor").val() + '/parametros', jsonData);
				window.electronAPI.grabarConfig(jsonData)
				break;
			case "calibracion":
				const Calibracion = {
					type: $("#file").val(),
					nombre: "./" + $("#file").val() + "-" + $("#idmotor").val() + ".json",
					pulsos_cal: $("#pulsos_cal").val(),
          pwm_manual: $("#calibrar_pwm").val(),
					calibrar_muestra: $("#calibrar_muestra").val(),
					dosis_pulso: $("#dosis_pulso").val(),
					ancho_labor: $("#ancho_labor").val()
				};

				const jsonDataCal = JSON.stringify(Calibracion);

				client.publish('/nodo/motor/' + $("#idmotor").val() + '/calibracion', jsonDataCal);
				window.electronAPI.grabarConfig(jsonDataCal)
				break;
			default:
				console.log("Sin opcion");
		}



	});
}

if (leerconfig) {
	leerconfig.addEventListener('change', () => {
		if ($("#idmotor").val() != 0) {

			nombre = "./" + $("#file").val() + "-" + $("#idmotor").val() + ".json";
			window.electronAPI.leerConfig(nombre);
		}


	});
}