import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import TopBar from './topBar';

import messages from '../../../../images/landingPage/messages.svg';
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
                    How it works
                </div>
            </div>
        );
    }
}

export default Home;