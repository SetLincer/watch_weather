const apiKey = '7fdcde4856a338da1a0e816379414b9b'; 



const citys = document.getElementById('city');
const temps = document.getElementById('Gradusi');
const icons = document.getElementById('weather_icon');
const winds = document.getElementById('wind');
const dates = document.getElementById('date');

const input = document.getElementById('weather-input');


function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long'
    });
}


async function getWeather(cityName) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKey}&units=metric&lang=en`;

        const res = await fetch(url);

        
        if (!res.ok) {
            throw new Error('HTTP error');
        }

        const data = await res.json();

     
        citys.textContent = data.name;
        temps.textContent = Math.round(data.main.temp) + '°C';
        winds.textContent = data.wind.speed + ' м/с';
        icons.textContent = data.weather[0].description;
        dates.textContent = getCurrentDate();

    } catch (error) {
        console.log(error);
        alert('Помилка запиту (API або інтернет)');
    }
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const value = input.value.trim();
        if (value) {
            getWeather(value);
        }
    }
});

getWeather('Rivne,');