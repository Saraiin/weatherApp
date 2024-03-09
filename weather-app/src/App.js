import React, {useState} from 'react'
import axios from 'axios'


function App() {
  //const url =`https://history.openweathermap.org/data/2.5/history/city?lat={lat}&lon={lon}&type=hour&start={start}&end={end}&appid=37eb92036042dca5f24872b2f626e987`
  
  
  return (
    <div className="App">
      <div className="container">
        <div className="top">
          <div className="location">dallas</div>
          <div className="temp">
            <h1>60°F</h1>
          </div>
          <div className="description">
            <p>clouds</p>
          </div>
        
        </div>
        <div className="bottom">
          <div className="feels"><p>60°F</p></div>
          <div className="humidity"><p>60°F</p></div>
          <div className="wind"><p>12 km/h</p></div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
