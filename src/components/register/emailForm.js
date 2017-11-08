import React from 'react';
import { Button, Input, InputGroupAddon, InputGroup } from 'reactstrap';

class EmailForm extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    sendVerificationLink = () => {
        console.log('here');
        this.props.sendVerificationLink(this.state.email, this.state.password);
    }

    render() {
        return(
            <div>
                <div className="email-form">
                    <InputGroup>
                        <Input placeholder="email" name="email" onChange={this.handleChange}/>
                        <InputGroupAddon>@ucla.edu</InputGroupAddon>
                    </InputGroup>
                    <Input type="password" name="password" id="password" placeholder="password" />
                </div>
                <Button color="primary" onClick={this.sendVerificationLink} block>Send Verification Link</Button>
            </div>
        );
    }
};

export default EmailForm;