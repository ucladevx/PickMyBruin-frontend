import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import classNames from 'classnames';
import { isatty } from 'tty';

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

function CreateField(props) {
	return (
		<div>
			<h2>{props.name}</h2>
			<TextField defaultValue={props.name} multiLine={true} rows={1} rowsMax={4} />
		</div>
	);
}

class Mentorship extends React.Component {

    renderAddClasses = () => {
        return <h2>Add Classes <i className="fa fa-plus" aria-hidden="true"></i></h2>
    }

    renderAddMajor = () => {
        return <h2>Add Major <i className="fa fa-plus" aria-hidden="true"></i></h2>
    }

    render() {

        const isActive = this.props.mentor.active;
        const major = null;
        const classesTaken = null;

        return(
			<MuiThemeProvider>
            	<div className="mentorship">
                	<div className="heading">
                    	<i className="fa fa-users fa-lg" aria-hidden="true"></i>
                    	<h1>Mentorship</h1>
                	</div>
                	<div className="body">
                    	<div className="mentorship-status">
                        	<h2>Mentorship Status:</h2>
							<Toggle id="status" toggled={isActive} onToggle={this.props.createMentor} style={styles.toggle} />
                    	</div>
						<div className={classNames({'disabled': !isActive}, 'mentor-fields')}>
							<div className="major">
								<h2>Major:</h2>
								{major ? <h2>major</h2> : this.renderAddMajor()}
							</div>
							<div className="Bio">
								<CreateField name="Bio" />
							</div>
							<div className="classes-taken">
								<h2>Classes Taken:</h2>
								{classesTaken ? <h2>classesTaken</h2> : this.renderAddClasses()}
							</div>
							<div className="GPA">
								<CreateField name="GPA" />
							</div>
							<div className="Pros">
								<CreateField name="Pros" />
							</div>
							<div className="Cons">
								<CreateField name="Cons" />
							</div>
							<div className="Clubs">
								<CreateField name="Clubs" />
							</div>
						</div>
                	</div>
                	{/*
                	<div className="banner">
                    	<p>Are you an upperclassman who's passionate about your major? Become a mentor and spread your wisdom!</p>
                	</div>
                	*/}
            	</div>
			</MuiThemeProvider>
        );
    }
}

export default Mentorship;
