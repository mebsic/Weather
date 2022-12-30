import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {

    return (
        <div className="container">
            <br /><div style={{ fontSize: 15, color: "red" }}><span role="img">⚠️</span> Location not found! Try again?</div>
            <br /><Link to={"/"}>&larr; Go back</Link>
        </div>
    );
}
