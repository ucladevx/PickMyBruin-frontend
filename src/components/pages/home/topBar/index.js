import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../util/Logo';

import newBquestLogo from '../../../../../images/loginPage/teal-bquest-logo.svg.inline';
import newBquest from '../../../../../images/loginPage/teal-bquest.svg.inline';

export default (props) => {
    return (
        <section className="top-bar">
            <Logo color="teal" LoggedIn={props.isLoggedIn} />
            <div className="nav-buttons">
                <Link id="login" to="/login">Login</Link>
                <Link id="signup" to="/register">Sign Up</Link>
            </div>
        </section>
    );
};
