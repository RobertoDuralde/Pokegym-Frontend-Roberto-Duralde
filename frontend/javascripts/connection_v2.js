var address = 'http://127.0.0.1:5000/';
var count = 0;
var n_vista = 18;
var ctrl = 1;
var indice = 0;

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
  if(ctrl){
      $.getJSON(address, function(data) {
      var data_keys = Object.keys(data[1]);
      var data_values = Object.values(data[1]);
      var table = document.getElementById("table_pokemons");
      if (indice == n_vista) {
        indice = 0;
        }
      if (data_keys[count] == undefined || data_values[count] == undefined) {
        alert("There's no more pokemons in the queue!")
        ctrl = 0;
        }
      var id_col = table.rows[indice].cells[0]
      var name_col = table.rows[indice].cells[1]
      id_col.innerHTML = data_values[count];
      name_col.innerHTML = data_keys[count];
      }
    )
  count += 1;
  indice += 1;
  }
};
