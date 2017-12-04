import React from 'react';
import logo from '../../../../images/landingPage/logo.png';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="landing-screen">
                    <section className="top-bar">
                        <div className="logo">
                            <img src={logo} id="logo" alt="logo" />
                        </div>
                        <div className="nav-buttons">
                            <div id="about">About DevX</div>
                            <div id="how">How It Works</div>
                        </div>
                    </section>
                </div>
                <div className="explanation">
                    How it works
                </div>
            </div>
        );
    }
}

export default Home;