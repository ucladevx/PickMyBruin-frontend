import React from 'react';

import logo from '../../../../../images/landingPage/logo.png';

export default () => {
    return (
        <section className="top-bar">
            <div className="logo">
                <img src={logo} id="logo" alt="logo" />
            </div>
            <div className="nav-buttons">
                <div id="about">About DevX</div>
                <div id="how">How It Works</div>
            </div>
        </section>
    );
};