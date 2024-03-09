import React, {useState} from 'react'
import axios from 'axios'
import './index.css'

function App() {
  const [zipCode, setZipCode] = useState('');
  //const [data, setData]= useState({});
  //const [location, setLocation] = useState('');
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
    return {
      lat: data.places[0].latitude,
      lon: data.places[0].longitude,
    };
  };

  const fetchWeather = async (lat, lon) => {
    const apiKey = '37eb92036042dca5f24872b2f626e987';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
  };
  /*const searchLocation = () => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
    }
    
  }*/
  


  return (
    <div className="App">
      <div className="search">
        <input value={zipCode}
        placeholder='Enter zip code'
        type="text"
        onChange={handleZipCodeChange}
        onKeyPress={handleSubmit}
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">{weatherData.name}</div>
          <div className="temp">
            <h1>{weatherData.main.temp}°F</h1>
          </div>
          <div className="description">
            <p>clouds</p>
          </div>
        
        </div>
        <div className="bottom">
          <div className="feels"><p className="bold">60°F</p><p>Feels Like</p></div>
          <div className="humidity"><p className="bold">20%</p>
          <p>Humidity</p></div>
          <div className="wind"><p className='bold'>12 km/h</p><p>Wind Speed</p></div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
