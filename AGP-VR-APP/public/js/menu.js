var menujson;
var menuequipos;
var menuvariables;
var menu;
var formularios = Array();
var formulario;
var debug = false;
Menu();
var menujson = {
    0:{
    "seccion1": {
      "idseccion": 1,
      "name": "Sección 1",
      "name_short": "S1",
      "equipos": {
        "equipo1": {
          "idequipo": 1,
          "name": "Equipo 1",
          "name_short": "E1",
          "variables": {
            "variable1": {
              "idseccion": 1,
              "idequipo": 1,
              "idestructura": 1,
              "name": "Variable 1",
              "tag": "tag1",
              "tag_user": "tag_user1",
              "unit": "unidad1",
              "tipodedato": "number",
              "minimo": 0,
              "maximo": 100,
              "device": "device1",
              "estructura": 1
            },
            "variable2": {
              "idseccion": 1,
              "idequipo": 1,
              "idestructura": 2,
              "name": "Variable 2",
              "tag": "tag2",
              "tag_user": "tag_user2",
              "unit": "unidad2",
              "tipodedato": "text",
              "minimo": null,
              "maximo": null,
              "device": "device2",
              "estructura": 1
            }
          }
        },
        "equipo2": {
          "idequipo": 2,
          "name": "Equipo 2",
          "name_short": "E2",
          "variables": {
            "variable3": {
              "idseccion": 1,
              "idequipo": 2,
              "idestructura": 3,
              "name": "Variable 3",
              "tag": "tag3",
              "tag_user": "tag_user3",
              "unit": "unidad3",
              "tipodedato": "number",
              "minimo": 0,
              "maximo": 100,
              "device": "device3",
              "estructura": 2
            },
            "variable4": {
              "idseccion": 1,
              "idequipo": 2,
              "idestructura": 4,
              "name": "Variable 4",
              "tag": "tag4",
              "tag_user": "tag_user4",
              "unit": "unidad4",
              "tipodedato": "text",
              "minimo": null,
              "maximo": null,
              "device": "device4",
              "estructura": 2
            }
          }
        }
    }
      }
    }
}
function Menu() {

    

    keyFirst=1;
        menu = '';
        /********Inicio Secciones */
        Object.keys(menujson).forEach(function(keyFirst) {
            menu += "<li class='nav-item'>";
            menu += "<a class='nav-link collapsed' href='#' data-toggle='collapse' data-target='#collapse" + menujson[keyFirst].idseccion + "' aria-expanded='true' aria-controls='collapse" + menujson[keyFirst].idseccion + "'>";
            menu += "<i class='fas fa-fw fa-wrench'></i>";
            menu += "<span>" + menujson[keyFirst].name + "</span>";
            menu += "</a>";
            menu += "<div id='collapse" + menujson[keyFirst].idseccion + "' class='collapse' aria-labelledby='heading" + menujson[keyFirst].idseccion + "' data-parent='#accordionSidebar'>";
            menu += "<div class='bg-white py-2 collapse-inner rounded'>";
            menu += "<h6 class='collapse-header'>" + menujson[keyFirst].name + "</h6>";

            menuequipos = menujson[keyFirst].equipos;
            var submenu = '';
            /********Inicio Equipos */
            Object.keys(menuequipos).forEach(function(keySecond) {
                submenu += "<a class='collapse-item' href='javascript:;' onclick=Form('" + menujson[keyFirst].idseccion + "','" + menuequipos[keySecond].idequipo + "')>" + menuequipos[keySecond].name + "</a>";

                menuvariables = menuequipos[keySecond].variables;
                formulario = "<h1 class='h3 mb-2 text-gray-800'>" + menujson[keyFirst].name + " :: " + menuequipos[keySecond].name + "</h1>";
                /********Inicio variables */
                Object.keys(menuvariables).forEach(function(keyThree) {
                    formulario += "<div class='card mb-4 py-3 border-left-primary'>";
                    if (debug)
                        console.log("TYPE:" + menuvariables[keyThree].tipodedato)
                    if (menuvariables[keyThree].tipodedato == "number" &&
                        menuvariables[keyThree].idseccion == menujson[keyFirst].idseccion &&
                        menuvariables[keyThree].estructura == menuequipos[keySecond].idestructura
                    ) {

                        formulario += "<div class='card-body'>";
                        formulario += "<div class='strong mb-1'><b>" + menuvariables[keyThree].name + "</b> en " + menuvariables[keyThree].unit + " entre " + menuvariables[keyThree].minimo + " y " + menuvariables[keyThree].maximo + "</div>";

                        formulario += "<input step='any'";
                        formulario += "id='" + menuvariables[keyThree].idestructura + "'";
                        formulario += "seccion='" + menujson[keyFirst].name_short + "'";
                        formulario += "equipo='" + menuequipos[keySecond].name_short + "'";
                        formulario += "unit='" + menuvariables[keyThree].unit + "'";
                        formulario += "name='" + menuvariables[keyThree].name + "'";
                        formulario += "tag='" + menuvariables[keyThree].tag + "'";
                        formulario += "tag_user='" + menuvariables[keyThree].tag_user + "'";
                        formulario += "device ='" + menuvariables[keyThree].device + "'";
                        formulario += "tipodedato='" + menuvariables[keyThree].tipodedato + "'";
                        formulario += "min='" + menuvariables[keyThree].minimo + "'";
                        formulario += "max='" + menuvariables[keyThree].maximo + "'";
                        formulario += "type='" + menuvariables[keyThree].tipodedato + "'";
                        formulario += "class='form-control form-control-user' placeholder='" + menuvariables[keyThree].unit + "'>";

                        formulario += "<a tag='" + menuvariables[keyThree].idestructura + "' onclick='Save(this)' href='#' class='btn btn-success btn-circle'><i class='fas fa-save'></i></a></div>";
                    }
                    if (menuvariables[keyThree].tipodedato == "text") {
                        formulario += "<div class='card mb-4 py-3 border-left-primary'></div>";
                        formulario += "<div class='small mb-1'>" + menuvariables[keyThree].name + "</div><div class='card-body'><input type='" + menuvariables[keyThree].tipodedato + "'  class='form-control form-control-user' placeholder='" + menuvariables[keyThree].unit + "'></div>";
                    }
                    formulario += "</div>";
                    //console.table('Key : ' + keyThree + ', Value : ' + menuvariables[keyThree] variables[keyThree].unit);
                    //formularios[] = formulario;
                    formularios.push({
                        idseccion: menuvariables[keyThree].idseccion,
                        idequipo: menuvariables[keyThree].idequipo,
                        idestructura: menuvariables[keyThree].idestructura,
                        name: menuequipos[keySecond].name_short,
                        form: formulario
                    });
                });
                /********Fin variables */


            });
            /********Fin Equipos */
            menu += submenu;
            menu += "</div>";
            menu += "</li>";
            $("#menu").html(menu);

        });
        /********Fin secciones */
    }


function Form(idseccion, idequipo) {
    if (debug)
        console.log("IDSECCION:" + idseccion)
    $.each(formularios, function(index, value) {
        if (debug)
            console.log(index + ' : ' + value.idseccion + "-" + value.idequipo);
        if (debug)
            console.log("Formulaior:" + JSON.stringify(value));
        $("#collapse" + idseccion).attr('class', 'collapse');
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $('.sidebar .collapse').collapse('hide');
        if (value.idseccion == idseccion && value.idequipo == idequipo)
            $("#contenido").html(value.form);
    });
}

$(".nav-item nav-link").on("click", "a", function() {
    if (debug)
        console.log($(this).text());
});