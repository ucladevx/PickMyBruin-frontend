import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ChipInput from 'material-ui-chip-input';

import { Button, Input, Alert} from 'reactstrap';

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
		height: 40,
		textAlign: "center",
	},
	textfield_input: {
        borderColor: '#007bff'
	},
	blurb: {
		paddingLeft:"4%",
		margin:"2%",
		lineHeight:"1.5em",
		fontSize: "90%"
	},

};

class Mentorship extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bioOpen: false,
            classesOpen: false,
            majorOpen: false,
            bio: this.props.mentor.bio,
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

    renderEditClasses = () => {
        return (
            <div className="add-classes">
                <ChipInput
                    onChange={chips => console.log(chips)}
                    fullWidth={true}
                    underlineFocusStyle={styles.textfield_input}
                    newChipKeyCodes={[32]}
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
                return (
                    <p onClick={() => this.openField("classesOpen")}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        &nbsp;Add Classes
                    </p>
                );
            } else {
                return this.renderEditClasses();
            }
        }
    }

    _updateBio = () => {
        this.openField("bioOpen");
        this.props.updateProfile("bio", this.state.bio);
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
                return (
                    <p onClick={() => this.openField("bioOpen")}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        &nbsp;Add a bio
                    </p>
                );
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

    _updateMajor = major => {
        this.openField("majorOpen");
        this.props.updateProfile("major", {name: major})
    }

    renderEditMajor = () => {
        let value = 1;
        return (
            <div className="add-major">
                <SelectField
                    value={this.props.mentor.major ? this.props.mentor.major.name : null}
                    style={styles.textfield}
                    onChange={(e, key, value) => this._updateMajor(value)}
                >
                    {majors.sort().map(major => {
                        value += 1;
                        return (
                            <MenuItem
                                key={value}
                                value={major}
                                primaryText={major}
                            />
                        );
                    })}
                </SelectField>
                <div className="buttons">
                    <Button
                        color="secondary"
                        onClick={() => this.openField("majorOpen")}
                        size="sm"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        );

    }

    renderMajor = () => {
        if (!this.props.mentor.major) {
            if (!this.state.majorOpen) {
                return (
                    <p onClick={() => this.openField("majorOpen")}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        &nbsp;Add a bio
                    </p>
                );
            } else {
                return this.renderEditMajor();
            }
        } else {
            if (!this.state.majorOpen) {
                return (
                    <div className="text-and-edit">
                        <p>{this.props.mentor.major.name}</p>
                        <i className="fa fa-pencil-square-o" onClick={() => this.openField("majorOpen")}></i>
                    </div>
                );
            } else {
                return this.renderEditMajor();
            }
        }
    }

    render() {
        const isActive = this.props.mentor.active;

		let notAmb =
		<Alert color="secondary">
			<ul style={styles.blurb}>
				<li>If you have declared your major, you can become an ambassador, and help out fellow bruins.</li>
				<li>As an ambassador you will meet with with undeclared or undecided students, who wants to hear about
					your major over a cup of coffee/tea.</li>
				<li>Meet with as many or as few students as you want. They will really
					appreciate your help, when deciding on their major.</li>
			</ul>
		</Alert>

	 	let isAmb =
		<div className={classNames({'disabled': !isActive}, 'mentor-fields')}>
			<div className="major">
				<h2>Major</h2>
				<Divider orientation={"horizontal"} />
				{this.renderMajor()}
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


        return(
			<MuiThemeProvider>
            	<div className="mentorship">
                	<div className="heading">
                    	<i className="fa fa-users fa-lg" aria-hidden="true"></i>
                    	<h1>Ambassador</h1>
                	</div>
                	<div className="body">
                    	<div className="mentorship-status">
                        	<h2>Ambassador Status:</h2>
							<Toggle
                                id="status"
                                toggled={isActive}
                                onToggle={this.props.updateMentorStatus}
                                style={styles.toggle}
                            />
                    	</div>

						<div>
            				{ !isActive
                				? notAmb
								: isAmb
            				}
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
