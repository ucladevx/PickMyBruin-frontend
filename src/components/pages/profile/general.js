import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

const styles = {
  toggle: {
    width: 44,
	height: 23,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
  update_button: {
	margin: "0px"
  },
  textfield: {
	  width: 140,
	  height: 31,
	  textAlign: "center",
  },
  textfield_input: {
	  textAlign: "center",
	  height: "50%"
  }
};

var isActive = true

class General extends React.Component {

    render() {
        const notifications = this.props.notifications || 'ON';
        const preferredEmail = this.props.user.email;
    
        return(
			<MuiThemeProvider>
            	<div className="general">
                	<div className="heading">
						<div className="icon-and-title">
                    		<i className="fa fa-cog fa-2x" aria-hidden="true"></i>
                    		<h1>General</h1>
						</div>
						<RaisedButton label="Update Profile" disabled={true} style={styles.update_button} />
                	</div>
                	<div className="body">
                    	<div className="notifications">
                        	<h2>Notifications:</h2>
							{ notifications=='OFF'
								? <Toggle label="" style={styles.toggle} />
								: <Toggle label="" defaultToggled={true} style={styles.toggle} />
							}
                    	</div>
                    	<div className="preferred-email">
                        	<h2>Preferred Email:</h2>
							<TextField id="email-field" defaultValue={preferredEmail} style={styles.textfield} inputStyle = {styles.textfield_input}/>
                    	</div>
                	</div>
            	</div>
			</MuiThemeProvider>
        );
    }
}

export default General;
