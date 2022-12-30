import React, { useState, useEffect } from 'react';
import LocalWeather from './components/LocalWeather';

export default function Home() {
    const [lat, setLat] = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);    
    // add your app ID here
    const appID = "7baee880eaf846f0a4834786e98e275c";

    useEffect(() => {
        async function fetchData() {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLat(position.coords.latitude);
                setLong(position.coords.longitude);
            });

            await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&appid=${appID}`)
                .then(res => res.json())
                .then(result => {
                    setData(result);
                });
        }
        fetchData();
    }, [lat, long]);

    return (
        <div>
            {(typeof data.main !== 'undefined') ? (<LocalWeather data={data} />) : (<div></div>)}
        </div>
    );
}
