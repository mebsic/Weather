import React, { useState } from 'react';
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import '../style.css';
import { Navigate } from 'react-router-dom';

function Weather(props) {
    const [itemsPerPage] = useState(3);
    const [pageNumberLimit] = useState(50);
    const [currentPage, setcurrentPage] = useState(1);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(50);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const cities = props.city.slice(firstIndex, lastIndex);

    const pages = [];
    for (let i = 1; i <= Math.ceil(props.city.length / itemsPerPage); i++) {
        pages.push(i);
    }

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    const renderPageNumbers = pages.map((number) => {
        return (
            <li
                key={number}
                id={number}
                onClick={handleClick}
                className={currentPage === number ? "active" : null}>
                {number}
            </li>
        );
    });

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}></li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> </li>;
    }

    if (cities.length === 0) {
        return (
            <div>
                <Navigate to={"/error"} />
            </div>
        );
    } else {
        return (
            <>
                <div>
                    {cities.map((data, index) => (
                        <div key={index} className="container">
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
                                        <b>Clouds: </b>{data.weather[0].description}<br />
                                        <b>Humidity: </b>{data.main.humidity}%<br />
                                        <b>Pressure: </b>{data.main.pressure} hPa<br />
                                        <b>Wind Speed: </b>{data.wind.speed} m/s<br />
                                        <b>Geo Location: </b>{data.coord.lat}, {data.coord.lon}<br />
                                        <b>Last Updated: </b>{moment.unix(data.dt).format("MM/DD/YYYY, hh:mm A")}<br />
                                    </Typography>
                                </AccordionDetails>
                            </Accordion><br />
                        </div>
                    ))}
                    <div className="container">
                        <ul className="pageNumbers">
                            <li>
                                <button type="button" className="btn btn-primary" onClick={handlePrevbtn} disabled={currentPage === pages[0] ? true : false}>Prev</button>
                            </li>
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                            <li>
                                <button type="button" className="btn btn-primary" onClick={handleNextbtn} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default Weather;
