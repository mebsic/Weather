import React from 'react';
import moment from 'moment';

const LocalWeather = ({ data }) => (
    <div className="container">
        <br /><h3><b><img width='30' height='20' alt="" src={`https://openweathermap.org/images/flags/` + data.sys.country.toLowerCase() + `.png`}></img>  {data.name}, {data.sys.country}</b></h3>
        <h4>{moment().format('dddd')}, {moment().format('LL')}</h4>
        <h4><img width='30px' height='30px' alt="" src={require(`../icons/` + data.weather[0].icon + `.png`)}></img> {data.weather[0].main}</h4>
        <h4>🌡{data.main.temp}&deg;C</h4>
        <h4>{data.main.temp_min}&deg;C/{data.main.temp_max}&deg;C</h4>
    </div>
)

export default LocalWeather;
