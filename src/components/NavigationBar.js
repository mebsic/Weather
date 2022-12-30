import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
    var cityID = useRef("");
    const [id, updateSearchId] = useState("");

    function handleCityID() {
        updateSearchId(cityID.current.value);
    }

    return (
        <div class="navigation">
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to={"/"} className="navbar-brand">Weather</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to={"/cities"}>Previously Viewed</Link>
                        </li>
                    </ul>
                    <form className="navbar-form navbar-right">
                        <label for="cityID" style={{fontWeight: 'normal', color: 'gray'}}>City ID&nbsp;&nbsp;</label>
                        <div className="input-group">
                            <input type="text" className="form-control" id="cityID" ref={cityID} onChange={handleCityID} onKeyPress={e => { if (e.key === "Enter") { e.preventDefault() } }} placeholder="e.g. 6167865" autoComplete='off' />
                            <span className="input-group-btn">
                                <Link to={"/city_id/" + id} onClick={() => cityID.current.value = ""} className="btn btn-default">Go</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </nav>
        </div>
    );
}
