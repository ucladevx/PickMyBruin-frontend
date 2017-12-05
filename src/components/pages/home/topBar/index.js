import React from 'react';

import logo from '../../../../../images/landingPage/logo.png';

export default (props) => {
    return (
        <section className="top-bar">
            <div className="logo">
                <img src={logo} id="logo" alt="logo" />
            </div>
            <div className="nav-buttons">
                <div id="about" onClick={() => location.href="http://www.ucladevx.com"}>About DevX</div>
                <div id="how">How It Works</div>
            </div>
        </section>
    );
};