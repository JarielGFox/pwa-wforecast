// Prendiamo gli elementi che ci servono

const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const suggestionParagraph = document.querySelector('.suggestion');
const apiKey = '3683101de4540e22547a44de42ba0499';
const langauge = 'en';
const units = 'metric';
const endPoint = 'https://api.openweathermap.org/data/2.5/weather' // indirizzo al quale fare la chiamata si chiama End Point.

const rootElement = document.documentElement; // prendo <html>

// Recuperiamo la posizione - arrivato a questo rigo prendi la mia posizione. 
window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

/* Qui al browser servono due funzioni, una da eseguuire in caso di errore, una in caso di successo */

// Da eseguire in caso di errore:

function onError(error) {
    weatherLocation.innerText = 'User denied Geolocation!';
    document.getElementById('no-geoloc').classList.remove('hidden');
};

// Da eseguire in caso di successo:  

function onSuccess(position) {
    document.getElementById('no-geoloc').classList.add('hidden');

    // Prepariamo i dati API:
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Costruiamo l'indirizzo comprensivo di query string:

    const apiUri = `${endPoint}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${langauge}&appid=${apiKey}` // La chiave del parametro della query string deve essere quello della documentazione o la query string non funziona!

    // Chiamiamo la API:

    fetch(apiUri).then(function (response) {
        // trasformo risposta in formato json
        const data = response.json();
        return data;
    }).then(function (data) {

        // Estrapoliamo le info che ci servono
        const locationName = data.name;
        const temperature = Math.floor(data.main.temp);
        const iconCode = data.weather[0].icon;
        const description = data.weather[0].description;

        // Prepariamo il consiglio giusto:
        const advices = getAdvice(iconCode);

        // Inseriamo questi dati dove vogliamo:
        weatherLocation.innerText = locationName;
        weatherTemperature.innerText = `${temperature}°`;
        weatherIcon.alt = description;
        weatherIcon.src = `img/${iconCode}.png`;
        suggestionParagraph.innerText = advices;

        // Rimuoviamo la classe attiva: js-loading
        rootElement.classList.remove('js-loading');
    })
};

// Funzione per recuperare il consiglio giusto:
function getAdvice(iconCode) {

    return advices[iconCode];

};