import React from 'react';
import LoginForm from './loginForm';

class Login extends React.Component {

    render() {

        return(
            <div className="container-login">
            	<h1>Hello! Login here!!</h1>
            	<LoginForm
            		sendUsernamePassword={this.props.sendUsernamePassword}
            	/>
            </div>
        )
    }
};

export default Login;