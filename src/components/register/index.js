import React from 'react';
import EmailForm from './emailForm';

import Loader from '../loader';

class Register extends React.Component {
    render() {

        return(
            <div className="container-register">
                {this.props.sendingEmail ? <Loader /> : 
                    <div>
                        Before we begin, help us verify that you're a current student by 
                        entering your <span className="email-color">official UCLA email</span>
                        <EmailForm sendVerificationLink={this.props.sendVerificationLink}/> 
                    </div>
                }
            </div>
        )
    }
};

export default Register;