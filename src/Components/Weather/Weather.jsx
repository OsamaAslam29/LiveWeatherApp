import React, { useEffect, useState } from 'react'
import './Weather.css'; 
import { GoLocation } from 'react-icons/go';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { AiOutlinePercentage } from 'react-icons/ai';
import { MdOutlineExposureZero } from 'react-icons/md';


export default function Weather() {
  
  const [cloud,setCloud]=useState(null);
  const [count,setCount]=useState(null);
  const [city,setCity]=useState(null);
  const[search,setSearch]=useState('Lahore');

  useEffect(()=>{
    const fetchApi = async()=>{
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=8694f05ad161aaaf22b411d0cadd8aca`
      const response = await fetch(url);
      const newResponse = await response.json();
      setCity(newResponse.main);
      setCount(newResponse.sys)
      setCloud(newResponse.clouds)
     }
      fetchApi();
      },[search])

  return (
    <>
    <div className="background_image"/>
      <div className="main_container">
        <div className="container">
          <div className="input_field" >
            <input type="search"
              className='field'
              placeholder='search your city'
              onChange={(event) => { 
                setSearch(event.target.value);
              }} />
          </div>
          {!city ? (
            <p style={{fontWeight:"bold",fontSize:"17x" }}>No data found</p>
          ): (
          <div className="info">
            <h1 className='country'>{count.country}</h1>
            <h2 className="location"><GoLocation />{search}</h2>
            <h1 className='temp'>{city.temp}<TbTemperatureCelsius /></h1>
            <h3>Clouds : {cloud.all}<AiOutlinePercentage/></h3>
            <h3>Humidity : {city.humidity}<AiOutlinePercentage/></h3>
            <h3>Sunrise : {new Date(count.sunrise ).getTime()}</h3>
            <h3>Sunset : {count.sunset}</h3>
            <h3>feels_like : {city.feels_like}<MdOutlineExposureZero/></h3>
            <h3>Pressusre : {city.pressure} hPa</h3>
            <h3 className="max-min-temp">Min : {city.temp_min} <TbTemperatureCelsius /> |  Max : {city.temp_max} <TbTemperatureCelsius/></h3>
          </div>
          ) }
        </div>
      </div>
    </>
  )
}
