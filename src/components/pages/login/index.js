import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './loginForm';
import newBquest from '../../../../images/loginPage/white-bquest.svg.inline'
import newBquestLogo from '../../../../images/loginPage/white-bquest-logo.svg.inline'

class Login extends React.Component {

    render() {
        return(
            <div className="container-login">
                <div className="logo">

					{/*<img className="logo__logo" src={newBquestLogo} alt="newBquestLogo"/>*/}
					{/*<img className="logo__text" src={newBquest} alt="newBquest"/>*/}
					<div className="logo__logo" dangerouslySetInnerHTML={{__html: newBquestLogo}} />
					<div className="logo__text" dangerouslySetInnerHTML={{__html: newBquest}} />
                </div>
                <div className="container-loginform">
					<h1 className="loginform__title">Login</h1>
                    <LoginForm login={this.props.login}/>
                </div>
            </div>
        )
    }
};


export default Login;

