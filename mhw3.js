//API KEY METHOD
const GIF_API_ENDPOINT = 'https://api.giphy.com/v1/gifs/search';
const api_key = "is17wJyq40LhIWxV0on0gNYCnylbvc0e";
const number_results_search = 4;
const offset_number = 0;
const rating = 'g';
const lang = 'en';
let url_canzone = ' ';
//API OAuth 2.0 METHOD
const ENDPOINT_TOKEN = 'https://accounts.spotify.com/api/token';
const client_id = '77bbe538c4744b50a82c2a7127e78604';
const client_secret = 'f158fc6adc7c41489edf0dac2e0da3bf';
const ENDPOINT_SEARCH = 'https://api.spotify.com/v1/search?'
var token_data = "";


function onGIF_search(json) {
    //Verifica mia
    console.log('JSON GIF ricevuto');
    console.log(json);
    //Svuoto contenuto
    const album_library  = document.querySelector('#album-view');
    album_library.innerHTML = '';

    //Verifica lettura risultati e stampare errore in caso di assenza di risultati 
    const results = json.data;
    for(let result of results) {
        console.log(result+'questo e un result');
        }

        if (results.lenght === 0) {
            const errore = document.createElement("h1"); 
	        const messaggio = document.createTextNode("Nessun risultato trovato!"); 
	        errore.appendChild(messaggio); 
	        album_library.appendChild(errore);
        }

        for (let result of results) {
            console.log(result);

            const image = result.images.downsized_medium.url;
            const album = document.createElement('div');
            album.classList.add('album');
            const img = document.createElement('img');
            img.src = image;

            album.appendChild(img);

            album_library.appendChild(album);
        }

}
//Funzione response relativo alle GIF
function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

//Funzioni fetch dopo aver preso il token   
function onResponse(response) {
    console.log('Risposta ricevuta fetch OAuth 2.0');
    return response.json();
  }









  function onJsonSpotify(json) {
    //Variabili utili
    
    console.log('JSON Spotify ricevuto');
    console.log(json);

    const items = json.tracks.items;
    //Stampo tutti i risultati della ricerca
    console.log(items);
    const indice_max = json.tracks.limit;
    console.log(indice_max);
     //Creo l'area dedicata alla ricerca
     const bacheca = document.querySelector('#album-view');
     bacheca.innerHTML= '';

   for (let i = 0; i < indice_max; i++) {
        var artist_name = items[i].album.artists[0].name;
        //Stampo gli autori della traccia musicale
        console.log(artist_name);
         var url_album_image = items[i].album.images[0].url;
        //Stampo gli autori della traccia musicale
        console.log(url_album_image);
          var url_song = items[i].external_urls.spotify;
        //Stampo il link alla traccia musicale
        console.log(url_song);

        //Stampo il nome della canzone
        const song_name = items[i].name;
        console.log(song_name);


        const album = document.createElement('div');
        album.classList.add('album');
        const album_img = document.createElement('img');
        album_img.src = url_album_image;
        const artista = document.createElement('div');
        artista.innerHTML = artist_name + ':';
        const nome = document.createElement('div');
        nome.innerHTML = song_name;

        const url_canzone = document.createElement('a');
        url_canzone.setAttribute('href',url_song);
        url_canzone.innerHTML = 'link canzone';
        
        
        

        album.appendChild(artista);
        album.appendChild(nome);
        album.appendChild(album_img);
        album.appendChild(url_canzone);
       
        bacheca.appendChild(album);


    }
    
   

    
  } 











function Ricerca(event)
{
    // Evita che il submit ricarichi la pagina
	event.preventDefault();
    //Lettura campo di ricerca
    const content = document.querySelector('#content').value;

    //Verifica inserimento
    if (content) {
        const text_search = encodeURIComponent(content);
		console.log('Ricerca di elementi: ' + text_search);
        //Leggi la tipologia di dato inserito
        const tipo = document.querySelector('#tipo').value;
		console.log('Ricerco elementi di tipo: ' +tipo);

        //Eseguo le fetch in base al tipo di dato che voglio cercare mediante API KEY
        if (tipo==='gif') {
            gif_request = GIF_API_ENDPOINT + '?api_key=' + api_key + '&q=' + text_search + '&limit=' + number_results_search
            + '&offset=' + offset_number + '&rating=' + rating + '&lang=' + lang ;
            fetch(gif_request).then(onResponse).then(onGIF_search);
        }
        //
        //Eseguo la fetch mediante OAuth 2.0 (in precedenza ho richiesto il token)
        if (tipo=== 'song') {
            let spotify_request = ENDPOINT_SEARCH + "q=" + text_search + "&type=track" +"&limit=6";
            fetch(spotify_request, 
            {
                method: 'GET',
             headers: {
              'Authorization': 'Bearer' + ' ' + token_data,
              
             }
            }).then(onResponse).then(onJsonSpotify);
            
           }
           
    }
}
//Funzioni fetch OAuth 2.0
function onTokenResponse(response){
    console.log('Risposta ricevuta token');
    console.log(response);
    return response.json();
   }

function getToken(json)
{
 token_data = json.access_token;
 console.log(json);
 console.log(token_data);
}


//Fase di richiesta del Token per la selezione di brani di Spotify

fetch(ENDPOINT_TOKEN,
    {
     method: 'POST',
     body: 'grant_type=client_credentials',
     headers:
     {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
     }
    }
    ).then(onTokenResponse).then(getToken);
    

const form = document.querySelector('#search_content');
form.addEventListener('submit',Ricerca);




