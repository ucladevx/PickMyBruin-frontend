import React from 'react';
import { Button } from 'reactstrap';

// https://reactstrap.github.io/components/form/

class LoginForm extends React.Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _sendUsernamePassword = () => {
        this.props.sendUsernamePassword(this.state.email, this.state.password);
    }

    render() {
        return(
            <div>
                <div className="email-login">
                    Email: <input name="email" type="text" onChange={this.handleChange} label="email"/>
                </div>
                <div className="password-login">
                    Password: <input name="password" type="text" label="password" onChange={this.handleChange} />
                </div>
                <Button color="primary" onClick={this._sendUsernamePassword } block>Login</Button>
            </div>
        );
    }
};

export default LoginForm;