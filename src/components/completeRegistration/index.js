import React from 'react';
import { Form, Input, Button, FormGroup, Label } from 'reactstrap'

class CompleteRegistration extends React.Component {
    state = {
        fullName: '',
        password: '',
        verifyPassword: ''
    }

    render() {
        return(
            <div className="container-complete-registration">
                <h1 className="welcome">Thanks for verifying! Let's get you set up.</h1>
                <FormGroup>
                    <Label for="fullName">Full Name</Label>
                    <Input type="text" name="fullName" id="fullName" />
                </FormGroup>
                <Label>Year</Label>
                <FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Freshman
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Sophomore
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Junior
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />{' '}
                            Senior
                        </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" name="password" id="password" />
                </FormGroup>
                <FormGroup>
                    <Label for="verifyPassword">Verify Password</Label>
                    <Input type="password" name="verifyPassword" id="verifyPassword" />
                </FormGroup>
                <Button color="primary" onClick={this.props.continue} block>Continue</Button>
            </div>
        );
    }
}

export default CompleteRegistration;