import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ChipInput from 'material-ui-chip-input';

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
        borderColor: '#007bff'
	},
    
};


class Mentorship extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bioOpen: false,
            bio: this.props.mentor.bio,
            classesOpen: false
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

    renderEditClasses = () => {
        return (
            <div className="add-classes">
                <ChipInput
                    onChange={chips => console.log(chips)}
                    fullWidth={true}
                    hintText={'press Enter to confirm a choice'}
                    underlineFocusStyle={styles.textfield_input}
                />
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
                        onClick={() => this.openField("classesOpen")} 
                        size="sm"
                    >
                        Cancel
                    </Button>                        
                </div>
            </div>
        ); 
    }
    
    renderClasses = () => {
        if (!this.props.mentor.classes) {
            if (!this.state.classesOpen) {
                return <p onClick={() => this.openField("classesOpen")}><i className="fa fa-plus" aria-hidden="true"></i> Add Classes</p>
            } else {
                return this.renderEditClasses();            
            }
        } 
    }

    _updateBio = () => {
        this.openField("bioOpen");
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
                        onClick={() => this.openField("bioOpen")} 
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
            if (!this.state.bioOpen) {
                return <p onClick={() => this.openField("bioOpen")}><i className="fa fa-plus" aria-hidden="true"></i> Add a bio</p>;
            } else {
                return this.renderEditBio();
            }
        } else {
            if (!this.state.bioOpen) {
                return (
                    <div className="text-and-edit">
                        <p>{this.props.mentor.bio}</p>
                        <i className="fa fa-pencil-square-o" onClick={() => this.openField("bioOpen")}></i>
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
