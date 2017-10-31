import React from 'react';
import { Button } from 'reactstrap';

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
                    <input type="text" value={this.state.email} onChange={this.handleChange} placeholder="joebruin"/>
                    <div>@ucla.edu</div>
                </div>
                <Button color="primary" onClick={this.sendVerificationLink} block>Send Verification Link</Button>
            </div>
        );
    }
};

export default EmailForm;