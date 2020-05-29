import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'components/util/LoginRegisterForm';
import Logo from '../../util/Logo';
import Footer from '../../footer';

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
                <Logo color="white" LoggedIn={false} />
                <section className="register-splash">
                    <div className="register-text">
                        <h1>Connect with students on all your major-related questions.</h1>
                    </div>
                </section>  
                <div className="register-form">
                    {this.props.sendingEmail ? <Loader /> :
                    <div className="container-emailform">
                        <h1>Create an account</h1>
                        <Form action={this.props.sendVerificationLink} buttonText="Send Verification Link" />
                    </div>
                    }
                </div>
                <Footer />
            </div>
        )
    }
};

export default Register;
