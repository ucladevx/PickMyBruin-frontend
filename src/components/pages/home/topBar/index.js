import React from 'react';

import logo from '../../../../../images/landingPage/logo.png';

export default (props) => {
    return (
        <section className="top-bar">
            <div className="logo">
                <img src={logo} id="logo" alt="logo" />
            </div>
            <div className="nav-buttons">
                <div id="login" onClick={() => location.href="/login"}>Login</div>
                <div id="signup" onClick={() => location.href="/register"}>Sign Up</div>
            </div>
        </section>
    );
};

