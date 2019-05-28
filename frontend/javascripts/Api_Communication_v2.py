import requests
from collections import OrderedDict
from operator import itemgetter
import json
from flask import Flask
from flask_cors import CORS
from flask import request

app = Flask(__name__)
CORS(app)
@app.route("/", methods=['GET', 'POST'])

def getSortedDict():
    # ENDPOINT: PokeAPI
    URL_DEX = "https://pokeapi.co/api/v2/pokedex/1"
    dex = requests.get(url = URL_DEX)
    dex_data = dex.json()
    total_id = len(dex_data["pokemon_entries"])  #pokemones totales (721)
    n_vista = 18
    
    poke_dict = {}
    poke_names = []
    poke_ids = []
    for poke_id in range(total_id):
        
        poke_entry = dex_data["pokemon_entries"][poke_id]["entry_number"]
        poke_name = dex_data["pokemon_entries"][poke_id]["pokemon_species"]["name"]

        poke_ids.append(poke_entry)
        poke_names.append(poke_name)
        poke_dict[poke_name] = poke_entry
    
    sorted_poke_names = sorted(poke_names)  

    #Primeros n_vista elementos que entran a la página
    first_names = sorted_poke_names[:n_vista]
    first_dict = {}
    for i in range(n_vista):
        first_dict[first_names[i]] = poke_dict[first_names[i]]

    #Preparamos la cola de total_id-n_vista elementos
    second_names = [item for item in sorted_poke_names if item not in first_names]
    second_dict = {}
    for name in second_names:
        second_dict[name] = poke_dict[name]
        data_list = [first_dict,second_dict]
    return json.dumps(data_list)

if __name__ == "__main__":
    app.run()

