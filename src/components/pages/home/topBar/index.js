import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <section className="top-bar">
            <div className="nav-buttons">
                <Link id="login" to="/login">Login</Link>
                <Link id="signup" to="/register">Sign Up</Link>
                {/*<div id="login" onClick={() => location.href="/login"}>Login</div>*/}
                {/*<div id="signup" onClick={() => location.href="/register"}>Sign Up</div>*/}
            </div>
        </section>
    );
};
