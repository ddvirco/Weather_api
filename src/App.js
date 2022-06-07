import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
    const [city, setCity] = useState()
    const [cityData, setCityData] = useState()
    const apiKey = "87116dee218f7c2e2356a40f1fac7e57"
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        
    const getWithAxios = async(e) => {
        if(e.key === 'Enter'){
            const resp = await axios.get(url)
            const getD = await resp.data
            setCityData(getD)
            setCity('')
        }
    }
    
    return (
    <div className="app">
        <div className='search'>
            <input type="text" value={city} placeholder='Enter city' 
            onChange={(e)=>{setCity(e.target.value)}}
            onKeyPress={getWithAxios}/>
            
        </div>
        <div className='container'>
            <div className='top'>
                <div className='location'>
                   {cityData? <p> {cityData.name}, {cityData.sys.country} </p>: null}
                </div>
                <div className='temp'>
                    {cityData? <h1> {cityData.main.temp.toFixed()}&#176; </h1>: null}
                </div>
                <div className='description'>
                    {cityData ? <p>{cityData.weather[0].description}</p> : null}
                </div>
            </div>
            {cityData ?  
            <div className='bottom'>
                <div className='feels'>
                    <p>Feels like</p>
                    {cityData ? <p className='bold'>{cityData.main.feels_like.toFixed()}&#176; </p> : null}  
                </div>
                <div className='humidity'>
                    <p>Humidity</p>
                    {cityData ? <p className='bold'>{cityData.main.humidity}%</p> : null}
                </div>
                <div className='wind'>
                    <p>Wind speed</p>
                    {cityData ? <p className='bold'>{cityData.wind.speed.toFixed()}MPH</p> : null }
                </div>
            </div>
            : null
            }
        </div>
    </div>
  );
}

export default App;
