import requests
import json
from flask import Flask
from flask_cors import CORS

#Creación de API en servidor http://127.0.0.1:5000
app = Flask(__name__)
#Header de seguridad para que el navegador no bloquee el acceso
CORS(app)
#Ruta del servidor
@app.route("/", methods=['GET', 'POST'])

def getSortedDict():
    # ENDPOINT: PokeAPI
    URL_DEX = "https://pokeapi.co/api/v2/pokedex/1"
    dex = requests.get(url = URL_DEX)
    dex_data = dex.json()

    #De los datos del pokedex obtenemos la cantidad total de pokemones
    total_id = len(dex_data["pokemon_entries"])  #pokemones totales (721)
    n_vista = 18

    #Obtención de datos requeridos: ID y Nombre
    poke_dict = {}
    poke_names = []
    poke_ids = []
    for poke_id in range(total_id):
        
        poke_entry = dex_data["pokemon_entries"][poke_id]["entry_number"]
        poke_name = dex_data["pokemon_entries"][poke_id]["pokemon_species"]["name"]

        poke_ids.append(poke_entry)
        poke_names.append(poke_name)
        poke_dict[poke_name] = poke_entry

    ### Se trabajará en listas por simplicidad, ya que los diccionarios no ###
    ###             pueden separar sus elementos de manera fácil           ###
    ### Posteriormente, los datos se pasan a un diccionario y formato json ###
    ###              para su procesamiento en "connection_v2.js"           ###

    #Ordenamos los nombres
    sorted_poke_names = sorted(poke_names)  

    #Primeros n_vista elementos que entran a la página
    first_names = sorted_poke_names[:n_vista]
    first_dict = {}
    for i in range(n_vista):
        first_dict[first_names[i]] = poke_dict[first_names[i]]

    #Preparamos la cola de (total_id-n_vista) elementos
    second_names = [item for item in sorted_poke_names if item not in first_names]
    second_dict = {}
    for name in second_names:
        second_dict[name] = poke_dict[name]
        data_list = [first_dict,second_dict]
    return json.dumps(data_list)

if __name__ == "__main__":
    app.run()

