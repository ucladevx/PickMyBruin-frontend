import React from 'react';
import { Input, InputGroupAddon, InputGroup } from 'reactstrap';
import Button from '../../util/Button';

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
                <div className="login-form">                    
                    <Input type="text" placeholder="email" name="email" onChange={this.handleChange}/>    
                    <Input type="password" name="password" id="password" placeholder="password" onChange={this.handleChange} />
                </div>
                <Button color="primary" onClick={this._sendUsernamePassword} block>Login</Button>
            </div>
        );
    }
}

export default LoginForm;
