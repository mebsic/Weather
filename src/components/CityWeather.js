import React from 'react';
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

const CityWeather = ({ data }) => (
    <div className="container">
        <br /><Accordion>
            <AccordionSummary expandIcon="＋" style={{ fontSize: "23px" }}>
                <Typography style={{ fontSize: "20px" }}>
                    <b><img width='30' height='20' alt="" src={`https://openweathermap.org/images/flags/` + data.sys.country.toLowerCase() + `.png`}></img>  {data.name}, {data.sys.country}</b><br />
                    <img width='30px' height='30px' alt="" src={require(`../icons/` + data.weather[0].icon + `.png`)}></img> {data.weather[0].main}<br />
                    🌡{data.main.temp}&deg;C<br />
                    Feels Like: {data.main.feels_like}&deg;C<br />
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography style={{ fontSize: "15px" }}>
                    <b>Expect weather from </b>{data.main.temp_min}&deg;C <b> to </b>{data.main.temp_max}&deg;C<br />
                    <b>Clouds: </b>{data.weather[0].description} <b>Humidity: </b>{data.main.humidity}% <b>Pressure: </b>{data.main.pressure} hPa<br />
                    <b>Wind Speed: </b>{data.wind.speed} m/s<br />
                    <b>Geo Location: </b>{data.coord.lat}, {data.coord.lon}<br />
                    <b>Last Updated: </b>{moment.unix(data.dt).format("MM/DD/YYYY, hh:mm A")}<br />
                </Typography>
            </AccordionDetails>
        </Accordion><br />
    </div>
)

export default CityWeather;
