import React from 'react';
import LoginForm from './loginForm';
import newBquest from '../../../../images/loginPage/white-bquest.svg.inline'
import newBquestLogo from '../../../../images/loginPage/white-bquest-logo.svg.inline'

class Login extends React.Component {

    render() {
        return(
            <div className="container-login">
                <div className="logo">
                    <div className="logo-logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
                    <div className="logo-text" dangerouslySetInnerHTML={{__html: newBquest}} />
                </div>
                <div className="container-loginform">
                    <h1 className="loginform-title">Login</h1>
                    <LoginForm login={this.props.login}/>
                </div>
            </div>
        )
    }
};


export default Login;

