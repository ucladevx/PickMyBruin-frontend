import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './loginForm';

class Login extends React.Component {

    render() {
        return(
            <div className="container-login">                
                <div className="container-loginform">
                    Create an account <Link className="register-color" to="/register">here</Link> if you do not have one
                    <LoginForm login={this.props.login}/> 
                </div>                
            </div>
        )
    }
};

export default Login;
