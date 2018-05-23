import React from 'react';
import Button from '../../util/Button';
import { Link } from 'react-router-dom';

import bg from '../../../../images/landingPage/bg.svg.inline';

class Home extends React.Component {

    render() {
        return (
            <div className="home-container">
                <div className="landing-screen">
                    <div className="bg" dangerouslySetInnerHTML={{__html: bg}} />
                </div>
            </div>
        );
    }
}

export default Home;
