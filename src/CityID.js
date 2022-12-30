import React, { useEffect, useState } from 'react';
import CityWeather from './components/CityWeather.js';
import { Link, useParams } from 'react-router-dom';

export default function CityID() {
    var { id } = useParams();
    var [data, setData] = useState([]);
    // add your app ID here
    const appID = "7baee880eaf846f0a4834786e98e275c";

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${appID}`)
            .then(res => res.json())
            .then(result => {
                setData(result);
            })
    }, [id]);

    return (
        <div className="CityID">
            {(typeof data.main !== "undefined") ? (<CityWeather data={data} />) :
            (<div className="container">
            <br /><div style={{ fontSize: 15, color: "red" }}><span role="img">⚠️</span> Could not load weather data! Try again?</div>
            <br /><Link to={"/"}>&larr; Go back</Link>
        </div>)}
        </div>
    );
}
