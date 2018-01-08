import React from 'react';

import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const styles = {
    radioStyles: {
        fill: "#007bff"
    },
    fieldStyles: {
        borderColor: "#007bff"
    },
    buttonStyles: {
        color: "#007bff",
        labelColor: "#FFFFFF"
    }
}

class CompleteRegistration extends React.Component {

    state = {
        fullName: null,
        year: null
    }
    onClick = e => {
        e.preventDefault();
        this.props.completeRegistration(this.state.fullName, this.state.year);
    }
    
    onChange = (e, v) => {
        this.setState({
            [e.target.name]: v
        });
    }

    render() {
        const buttonDisabled = !!this.state.fullName && !!this.state.year;
        return(
            <div className="container-complete-registration">
                <div className="verify-card">
                    <h1 className="welcome">Thanks for verifying! Let's get you set up.</h1>
                    <MuiThemeProvider>
                        <TextField
                            name="fullName"
                            hintText="Full name"
                            value={this.state.fullName}
                            onChange={this.onChange}
                            fullWidth={true}
                            underlineFocusStyle={styles.fieldStyles}
                        />
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <RadioButtonGroup name="year" onChange={this.onChange}>
                            <RadioButton
                                value="1st"
                                label="freshman"
                                iconStyle={styles.radioStyles}
                            />
                            <RadioButton
                                value="2nd"
                                label="sophomore"
                                iconStyle={styles.radioStyles}
                            />
                            <RadioButton
                                value="3rd"
                                label="junior"
                                iconStyle={styles.radioStyles}
                            />
                            <RadioButton
                                value="4th"
                                label="senior"
                                iconStyle={styles.radioStyles}
                            />
                        </RadioButtonGroup>
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <RaisedButton 
                            label="Continue"
                            fullWidth={true} 
                            disabled={!buttonDisabled} 
                            backgroundColor={styles.buttonStyles.color} 
                            labelColor={styles.buttonStyles.labelColor} 
                            onClick={this.onClick} 
                        />
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }
}

export default CompleteRegistration;
