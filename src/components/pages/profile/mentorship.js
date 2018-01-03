import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { Button, Input } from 'reactstrap';

import classNames from 'classnames';
import { isatty } from 'tty';

import Divider from '../../util/divider';

import majors from '../../../majors.json';


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
			<TextField 
                id={props.name} 
                defaultValue={props.name} 
                multiLine={true} 
                rows={1} 
                rowsMax={4}
            />
		</div>
	);
}

class Mentorship extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            addBioOpen: false,
            bio: this.props.mentor.bio
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({bio: nextProps.mentor.bio});
    }

    openField = field => {
        this.setState({
            [field]: !this.state[field]
        });
    }

    renderAddMajor = () => {
        let value = 1;
        return ( 
            <SelectField value={this.props.mentor.major}>
                {majors.map(major => {
                    value += 1;
                    return (
                        <MenuItem 
                            value={value}
                            primaryText={major}
                        />
                    );
                })}
            </SelectField>
        );

    }
    
    renderClasses = () => {
        if (!this.props.mentor.classes) {
            return <p><i className="fa fa-plus" aria-hidden="true"></i> Add Classes</p>
        }
    }

    _updateBio = () => {
        this.openField("addBioOpen");
        this.props.updateBio(this.state.bio);
    }

    renderEditBio = () => {
        return (
            <div className="add-bio">
                <Input type="textarea" onChange={e => this.setState({bio: e.target.value})} value={this.state.bio} name="bio" id="bio" />
                <div className="buttons">
                    <Button
                        color="primary"
                        onClick={() => this._updateBio()} 
                        size="sm"
                    >
                        Save
                    </Button>
                    <Button 
                        color="secondary" 
                        onClick={() => this.openField("addBioOpen")} 
                        size="sm"
                    >
                        Cancel
                    </Button>                        
                </div>
            </div>
        );
    }

    renderBio = () => {
        if (!this.props.mentor.bio) {
            if (!this.state.addBioOpen) {
                return <p onClick={() => this.openField("addBioOpen")}><i className="fa fa-plus" aria-hidden="true"></i> Add a bio</p>;
            } else {
                return this.renderEditBio();
            }
        } else {
            if (!this.state.addBioOpen) {
                return (
                    <div className="text-and-edit">
                        <p>{this.props.mentor.bio}</p>
                        <i className="fa fa-pencil-square-o" onClick={() => this.openField("addBioOpen")}></i>
                    </div>
                );
            } else {
                return this.renderEditBio();
            }
        }
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
							<Toggle 
                                id="status" 
                                toggled={isActive} 
                                onToggle={this.props.updateMentorStatus} 
                                style={styles.toggle} 
                            />
                    	</div>
						<div className={classNames({'disabled': !isActive}, 'mentor-fields')}>
							<div className="major">
								<h2>Major:</h2>
								{major ? <h2>major</h2> : this.renderAddMajor()}
							</div>
							<div className="bio">
                                <h2>Bio</h2>
                                <Divider orientation={"horizontal"} />
                                {this.renderBio()}
							</div>
							<div className="classes-taken">
								<h2>Classes Taken:</h2>
                                <Divider orientation={"horizontal"} />
								{this.renderClasses()}
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
