# Pokegym-Frontend-Roberto-Duralde

The first step to run this code is to install all dependencies, which are the next Python libraries:
  - json
  - requests
  - flask
  - flask_cors

With all due dependencies installed and up to date, follow these steps to run the API:

  1.- Run the command "py Api_Communication_v2.py", until the console says the app is running in the port http://127.0.0.1:5000. (This           was coded in Python 3.6.2, thus the "py" command to run the script).
  
  2.- Once the API is running, open the index.html file in your browser (tested on Google Chrome).
  
  3.- Initially, 18 pokemons will show in the view. After that and every second, a new pokemon is drawn from the queue and written on a         position in the table (starting from top to bottom). After all pokemons were shown, an alert will be displayed notifying that no           more pokemons are left.
