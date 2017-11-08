import React from 'react';
import { Button, Input, InputGroupAddon, InputGroup } from 'reactstrap';

class EmailForm extends React.Component {
    state = {
        email: ''
    }

    handleChange = e => {
        this.setState({email: e.target.value})
    }

    sendVerificationLink = () => {
        this.props.sendVerificationLink(this.state.email);
    }

    render() {
        return(
            <div>
                <div className="email-form">
                    <InputGroup>
                        <Input placeholder="email" />
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