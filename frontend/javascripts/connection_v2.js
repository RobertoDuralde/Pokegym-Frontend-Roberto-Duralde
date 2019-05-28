//SECCIÓN DE VARIABLES
var address = 'http://127.0.0.1:5000/'; //Puerto del servidor
var count = 0;  //Variable que recorre los datos
var n_vista = 18; //Límite de vista requerido
var ctrl = 1; //Para detectar el final de todos los pokemones
var indice = 0; //Índice de posición en la tabla de vista de pokemones

/*
Cargamos el primero de los dos diccionarios enviados por el script de Python.
El denominado "first_dict" (en el script de Python), son los primeros 18
pokemones ordenados alfabéticamente, dejando 703 (total_id-n_vista) en el
segundo diccionario.
*/
$(document).ready(function(){
  $.getJSON(address, function(data) {
    var init_data_keys = Object.keys(data[0]);
    var init_data_values = Object.values(data[0]);
    $('#table_pokemons tbody').empty()
    for(var i = 0;i<init_data_keys.length;i++){
      $('#table_pokemons tbody').append(
          '<tr><td><div class="col-1">' + init_data_values[i] + '</div></td><td><div class="col-11">' + init_data_keys[i] + '</div></td></tr>'
        )
      }
    }
  )
  add_pokemons_to_list();
  setInterval(function() {
    add_pokemons_to_list()
  }, 1000)
});

function add_pokemons_to_list() {
  /*Para evitar el llenado de la vista con "undefined", llevamos el control
  de la cantidad de pokemones mostrados. Al llegar al total, esta variable
  toma el valor de 0.
  */
  if(ctrl){
      $.getJSON(address, function(data) {
        //Cargamos el segundo diccionario con los otros pokemones ordenados
        var data_keys = Object.keys(data[1]);
        var data_values = Object.values(data[1]);
        var table = document.getElementById("table_pokemons");
        /*Se reinicia la posición del índice para reemplazar el primer pokemon en la tabla
        */
        if (indice == n_vista) {
          indice = 0;
        }
        //Evaluación de fin de lista
        if (data_keys[count] == undefined || data_values[count] == undefined) {
          alert("There's no more pokemons in the queue!")
          ctrl = 0;
        }
        //Posición de escritura dentro de la tabla
        var id_col = table.rows[indice].cells[0]
        var name_col = table.rows[indice].cells[1]

        //Valor a escribir en la posición determinada
        id_col.innerHTML = data_values[count];
        name_col.innerHTML = data_keys[count];
      }
    )
  count += 1;
  indice += 1;
  }
};
