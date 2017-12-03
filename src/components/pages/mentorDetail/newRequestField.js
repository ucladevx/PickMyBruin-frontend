import React from 'react';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Button } from 'reactstrap';

const styles = {
    textareaStyle: {
        "background-color": "#f5f4f6",
        "padding": "10px"
    },
    underlineStyle: {
        borderColor: "#007bff"
    }
}

class NewRequestField extends React.Component {
    render() {
        const {
            mentorName 
        } = this.props;

        return (
            <div className="new-request-input">
                <h1>Tell {mentorName} a little bit about yourself</h1>
                <p>If you would like to meet, be sure to include your availability</p>
                <MuiThemeProvider>
                    <TextField
                        fullWidth={true}
                        multiLine={true}
                        rows={4}
                        textareaStyle={styles.textareaStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    />
                </MuiThemeProvider>
                <div className="buttons">
                    <Button color="success" block>Send Request</Button>
                    <Button color="secondary" onClick={this.props.cancel} block>Cancel</Button>
                </div>
            </div>
        );
    }
}

export default NewRequestField;