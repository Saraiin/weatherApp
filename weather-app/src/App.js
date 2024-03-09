import React, {useState} from 'react'
import axios from 'axios'
import './index.css'

function App() {
  const [zipCode, setZipCode] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  //const url =`https://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&end={end}&appid=37eb92036042dca5f24872b2f626e987`
  

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const coordinates = await fetchCoordinates(zipCode);
      const weather = await fetchWeather(coordinates.lat, coordinates.lon);
      setWeatherData(weather);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchCoordinates = async (zipCode) => {
    const response = await fetch(`https://api.zippopotam.us/it/${zipCode}`);
    const data = await response.json();
    if (data.places && data.places.length > 0) {
      return {
        lat: data.places[0].latitude,
        lon: data.places[0].longitude,
      };
    } else {
      throw new Error('No coordinates found for the provided zip code');
    }
  };
  

  const fetchWeather = async (lat, lon) => {
    const apiKey = '37eb92036042dca5f24872b2f626e987';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  };
 


  return (
    <div className="App">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            value={zipCode}
            placeholder="Enter zip code"
            type="text"
            onChange={handleZipCodeChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="container">
       {weatherData && weatherData.name && (
          <div className="top">
            <div className="location">
                <p>{weatherData.name} - {weatherData.sys.country}
                </p>
            </div>
            <div className="temp">
                {weatherData.main && <h1>{weatherData.main.temp}°F</h1>}
            </div>
            <div className="description">
              {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
              <p>{weatherData.weather[0].description}</p>
              )}
            </div>
          </div>
        )}
        {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">{weatherData.main.feels_like}</p>
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              <p className="bold">{weatherData.main.humidity}%</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              <p className='bold'>{weatherData.wind.speed}</p>
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


export default App;
