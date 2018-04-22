import React from 'react';
import { Input, InputGroupAddon, InputGroup } from 'reactstrap';
import Button from '../../util/Button';

class EmailForm extends React.Component {
    state = {
        email: '',
        password: ''
    }

	handleKeyDown = (event) => {
		let key = event.key || event.keyIdentifier || event.keyCode;
		if (key.toString().toLowerCase() === 'enter' || +key === 13) {
			this.sendVerificationLink();
			event.preventDefault();
		}
	}

    componentDidMount() {
    	document.addEventListener('keydown', this.handleKeyDown)
	}

	componentWillUnmount() {
    	document.removeEventListener('keydown', this.handleKeyDown);
	}

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    sendVerificationLink = () => {
        this.props.sendVerificationLink(this.state.email, this.state.password);
    }

    render() {
        return(
            <div>
                <div className="email-form">
                    <InputGroup>
                        <Input placeholder="email" name="email" onChange={this.handleChange}/>
                        <InputGroupAddon>@g.ucla.edu</InputGroupAddon>
                    </InputGroup>
                    <Input type="password" name="password" id="password" placeholder="password" onChange={this.handleChange}/>
                </div>
                <Button onClick={this.sendVerificationLink} block>Send Verification Link</Button>
            </div>
        );
    }
};

export default EmailForm;
