import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import TopBar from './topBar';

import messages from '../../../../images/landingPage/messages.svg';
import explanation from '../../../../images/landingPage/explanation.svg';
import bottom from '../../../../images/landingPage/bottom.svg';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="landing-screen">
                    <TopBar />
                    <div className="splash">
                        <div className="main-prompt">
                            <h1>Connect with your fellow Bruins about major-related questions.</h1>
                            <Button color="primary" onClick={this.props.signUp}>Sign Up</Button>
                            <p>Already have an account? <Link className="login-link" to="/login">Log in here</Link></p>
                            
                        </div>
                        <img src={messages} alt="messages" />
                    </div>
                </div>
                <div className="explanation">
                    <img src={explanation} alt="explanation" />
                </div>
                <div className="get-involved">
                    <div className="prompt">
                        <h1>It's the perfect time to get involved</h1>
                        <Button color="primary" onClick={this.props.signUp}>Sign Up Now</Button>
                    </div>
                    <img src={bottom} alt="bottom" />
                </div>
            </div>
        );
    }
}

export default Home;