import React, { Fragment, useEffect, useState } from 'react';
import axios from "axios";
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { IoMdThermometer } from "react-icons/io";
import { FaUmbrella,FaCloudShowersHeavy  } from "react-icons/fa";
import Navbar from './header';

function App() {
 
  const [location, setLocation] = useState(false); 
   const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather?id=3470858&appid=ef734f330b18844bbd323a42b71ab984", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

 if(location === false){
    return(
      <Fragment>
        Você precisa habilitar a localização no browser o/
      </Fragment>
      
    )
  } else if (weather === false) {
    return (
      <Fragment>
        Carregando o clima...
      </Fragment>
    )
  } else {
      return (
       
        <Fragment>
          <Navbar />
       <div className="header">
       
        <h3>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</h3>
  
    
    
      <div className="container">
         <div className="cidade">Barbacena,MG</div>
         <div className="dia">Segunda-Feira, 14 de junho</div>
         <div hora="hora">13:30</div>
         
       
      <ul className="temp-text">
        <li className="tem-atual">Temperatura atual: <Brightness7Icon fontSize="28" className="sol"/> {weather['main']['temp']}° </li>
        <li>Temperatura máxima: <IoMdThermometer fontSize="28" className="temperatura"/>{weather['main']['temp_max']}° </li>
        <li>Temperatura minima: <IoMdThermometer fontSize="28" className="temperatura2"/>{weather['main']['temp_min']}°</li>
        <li>Pressão: <FaUmbrella  className="FaUmbrella" fontSize="28"/> {weather['main']['pressure']} hpa</li>
        <li>Humidade:  <FaCloudShowersHeavy fontSize="28" className="FaCloudShowersHeavy"/>{weather['main']['humidity']}%</li>
      </ul>
      <div className="previsão-texto">previsão do tempo</div>
      </div>
      </div>
      <div className="lorem"> <h2>What is Lorem Ipsum?</h2> 
<p>Lorem Ipsum is simply dummy text of the printing and typesetting
industry. Lorem Ipsum has been the industry's standard dummy text
 ever since the 1500s, when an unknown printer took a galley of 
 type and scrambled it to make a type specimen book. It has 
 survived not only five centuries, but also the leap into
  electronic typesetting, remaining essentially unchanged. 
  It was popularised in the 1960s with the release of Letraset
   sheets containing Lorem Ipsum passages, and more recently with
    desktop publishing software like Aldus PageMaker including 
    versions of Lorem Ipsum.</p></div>
    </Fragment>
   
     );
    }
 }


export default App;
