import React from 'react';
import { Link } from 'react-router-dom';
import EmailForm from './emailForm';
import logo from '../../../../images/landingPage/logo.png';

import Loader from '../../loading';

class Register extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (!this.props.sentEmail && nextProps.sentEmail) {
            this.props.redirectToPending();
        }
    }

    render() {
        return (
            <div className="container-register">
                <div className="logo">
                    <img src={logo} id="logo" alt="logo" />
                </div>  
                {this.props.sendingEmail ? <Loader /> : 
                    <div className="container-emailform">
                        Create an account with your <span className="email-color">official UCLA email</span>
                        <EmailForm sendVerificationLink={this.props.sendVerificationLink}/> 
                        <p>Already have an account? Login <Link to="/login">here</Link></p>
                    </div>
                }
            </div>
        )
    }
};

export default Register;
