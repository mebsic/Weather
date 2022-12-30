import React, { useState, useRef } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Weather from './components/Weather';
import NotFound from './Utils/NotFound';
import CityID from './CityID';
import Home from './Home';

export default function App() {
  var input = useRef("");
  const navigate = useNavigate();
  const [city, setCity] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  // add your app ID here
  const appID = "7baee880eaf846f0a4834786e98e275c";

  async function handleSubmit(e) {
    e.preventDefault();

    if (input.current.value !== "") {
      await fetch(`https://api.openweathermap.org/data/2.5/find?q=${input.current.value}&units=metric&cnt=50&appid=${appID}`)
        .then(response => response.json())
        .then(result => {
          setCity(result.list);
          input.current.value = "";

          if (result.list && result.list.length > 0) {
            navigate("/cities");
          } else {
            navigate("/error");
          }
        })
        .catch(() => {
          navigate("/error");
        });
    }
  };

  function viewedCity(cities) {

    if (!recentlyViewed.find((c) => c.id === cities.id)) {
      setRecentlyViewed((prev) => [...prev, city]);
    }
  }

  return (
    <div className="App">
      <div>
        <NavigationBar />
      </div>
      <div className="container">
        <br /><br /><br /><br /><form method="post" onSubmit={handleSubmit}>
          <div className="col-md-auto">
            <h3 className="text-primary" style={{ textDecoration: 'none' }}><i className="glyphicon glyphicon-cloud"></i>  Weather forecast</h3>
            <div className="input-group">
              <input type="text" ref={input} className="form-control" placeholder="Enter a city..." autoComplete='off' />
              <span className="input-group-btn">
                <input type="submit" className="btn btn-primary" value="Search" />
              </span>
            </div>
          </div>
        </form>
      </div>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/city_id/:id" element={<CityID />} />
        <Route exact path="/viewed/:id" element={<CityID recentlyViewed={recentlyViewed} />} />
        <Route exact path="/cities" element={<Weather city={city} viewedCity={viewedCity} />} />
        <Route exact path="/error" element={<NotFound />} />
        <Route path="*" element={<Navigate to={"/error"} />} />
      </Routes>
    </div>
  );
}
