import React from 'react';
import { Form, Input, Button, FormGroup, Label } from 'reactstrap'

class CompleteRegistration extends React.Component {
    state = {
        fullName: '',
        password: '',
        verifyPassword: ''
    }

    onClick = e => {
        e.preventDefault();
        console.log(e);
        console.log(this.state)
    }
    
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return(
            <div className="container-complete-registration">
                <h1 className="welcome">Thanks for verifying! Let's get you set up.</h1>
                <Form>
                    <FormGroup>
                        <Label for="fullName">Full Name</Label>
                        <Input type="text" name="fullName" id="fullName" onChange={this.onChange}/>
                    </FormGroup>
                    <Label>Year</Label>
                    <FormGroup onChange={this.onChange}>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="freshman" />{' '}
                                Freshman
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="sophomore" />{' '}
                                Sophomore
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="junior" />{' '}
                                Junior
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="senior" />{' '}
                                Senior
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="verifyPassword">Verify Password</Label>
                        <Input type="password" name="verifyPassword" id="verifyPassword" onChange={this.onChange}/>
                    </FormGroup>
                    <Button color="primary" onClick={this.props.onClick} block>Continue</Button>
                </Form>
            </div>
        );
    }
}

export default CompleteRegistration;