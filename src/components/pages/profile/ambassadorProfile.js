import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChipInput from 'material-ui-chip-input';
import Chip from 'material-ui/Chip';

import { Button, Input, Alert, FormGroup, Label, InputGroup, InputGroupAddon, InputGroupButton } from 'reactstrap';

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
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },

};

class AmbassadorProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classesOpen: false,
            bio: props.mentor.bio,
            // major: props.mentor.major || {name: ''},
            // minor: props.mentor.minor || {name: ''},
            major: props.mentor.major || [],
            minor: props.mentor.minor || [],
            majorDisplayLength: props.mentor.major ? props.mentor.major.length : 0,
            minorDisplayLength: props.mentor.minor ? props.mentor.minor.length : 0,
            courses: props.mentor.courses ? props.mentor.courses.map(obj => obj.name) : []
        }
    }

    componentWillReceiveProps(nextProps) {
        let {
            major: currMajor,
            minor: currMinor,
        } = this.state;

        let {
            major: nextMajor,
            minor: nextMinor,
        } = nextProps.mentor;
        nextMajor = nextMajor || []; // avoid undefined
        nextMinor = nextMinor || []; // avoid undefined

        // The following lines are considered a hack
        // (as it is based on the assumption: when currMajor.length > nextMajor.length, the user must be editing other fields while not selecting the yet to select major)
        if (currMajor.length > nextMajor.length) { // check if we have unsaved empty major <select />
            nextMajor.push({ name: '' });
        }

        if (currMinor.length > nextMinor.length) { // check if we have unsaved empty minor <select />
            nextMinor.push({ name: '' });
        }

        this.setState({
            bio: nextProps.mentor.bio,
            // major: nextProps.mentor.major,
            // minor: nextProps.mentor.minor || {name: ''},
            major: nextMajor,
            minor: nextMinor,
            courses: nextProps.mentor.courses.map(obj => obj.name)
        });
    }


    openField = field => {
        this.setState({
            [field]: !this.state[field]
        });
    }

    handleRequestAdd (chip) {
        this.setState({
            courses: [...this.state.courses, chip]
        })
    }

    handleRequestDelete (deletedChip) {
        this.setState({
            courses: this.state.courses.filter((c) => c !== deletedChip)
        })
    }

    renderEditClasses = () => {
        return (
            <div className="add-classes">
                <ChipInput
                    fullWidth={true}
                    underlineFocusStyle={styles.textfield_input}
                    value={this.state.courses}
                    onRequestAdd={(chip) => this.handleRequestAdd(chip)}
                    onRequestDelete={(deletedChip) => this.handleRequestDelete(deletedChip)}
                />
                <div className="buttons">
                    <Button
                        className="add-class-btn"
                        onClick={() => this._updateClasses()}
                        size="sm"
                    >
                        Save
                    </Button>
                    <Button
                        className="cancel-class-btn"
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
        if (!this.props.mentor.courses) {
            return null;
        }

        if (!this.props.mentor.courses.length) {
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
        } else {
            if (!this.state.classesOpen) {
                let key = 0;
                return (
                    <div className="text-and-edit">
                        <div className="courses">
                            {this.props.mentor.courses.map(course => {
                                key += 1;
                                return (
                                    <Chip style={styles.chip} key={key}>{course.name}</Chip>
                                );
                            })}
                        </div>
                        <Button size="sm" className="edit-class-btn" onClick={() => this.openField("classesOpen")}>Edit</Button>
                        {/*<i className="fa fa-pencil-square-o" style={{paddingTop:"3%"}} onClick={() => this.openField("classesOpen")}></i>*/}
                    </div>
                );
            } else {
                return this.renderEditClasses();
            }
        }
    }

    _updateBio = () => {
        this.props.updateProfile("bio", this.state.bio);
    }

    _updateClasses = () => {
        this.openField("classesOpen");
        this.props.updateProfile("courses", this.state.courses.map(function(str){
            return ({name: str})
        }));
    }

    renderBio = () => {
        return (
            <div className="add-bio">
                <Input type="textarea" onBlur={() => this._updateBio()}  onChange={e => this.setState({bio: e.target.value})} value={this.state.bio} name="bio" id="bio" />
            </div>
        );
    }

    _updateMajor = (majorName, index) => {
        const {
            major: currMajor,
        } = this.state;

        if (!majorName) { // means remove this major
            // even if the major is a cached version and not yet updated from database
            // should be fine to just trigger saving major again (unneeded network request, but well..)
            currMajor.splice(index, 1);
            this.props.updateProfile("major", currMajor);
            return;
        }

        // Check if the last major is empty
        if (index >= currMajor.length) {
            return // does nothing
        }

        currMajor[index].name = majorName;
        this.props.updateProfile("major", currMajor); // no setState, wait for receiving new props
    }

    _updateMinor = (minorName, index) => {
        const {
            minor: currMinor,
        } = this.state;

        if (!minorName) { // means remove this minor
            // even if the minor is a cached version and not yet updated from database
            // should be fine to just trigger saving minor again (unneeded network request, but well..)
            currMinor.splice(index, 1);
            this.props.updateProfile("minor", currMinor);
            return;
        }

        // Check if the last minor is empty
        if (index >= currMinor.length) {
            return // does nothing
        }

        currMinor[index].name = minorName;
        this.props.updateProfile("minor", currMinor); // no setState, wait for receiving new props
    }

    renderSingleMajor = (majorName, index) => {
        return (
            <div className="select-entry">
                <InputGroup key={index}>
                    <Input type="select"
                           value={majorName || ''}
                           onChange={({ target }) => {
                               this._updateMajor(target.value, index);
                           }}>
                        <option key={-1} value="" disabled>SELECT A MAJOR</option>
                        {majors.sort().map((major, i) => { // assuming possibility of minors are same as that of majors
                            return <option key={i} value={major}>{major}</option>;
                        })}
                    </Input>
                    <Button className="remove" onClick={() => {
                        this._updateMajor(null, index);
                    }}>Delete</Button>
                </InputGroup>
            </div>
        );
    }

    renderMajor = () => {
        const {
            major: currMajor,
        } = this.state;

        let displayList = currMajor.map((e, i) => this.renderSingleMajor(e.name || '', i));

        const canAddMajor = currMajor.length === 0 || (currMajor.length < 2 && currMajor[currMajor.length-1].name !== '');

        return (
            <div>
                {displayList}
                {canAddMajor &&
                    <Button
                        className="add"
                        onClick={() => {
                        let newMajor = currMajor.slice();
                        newMajor.push({name: ''});
                        this.setState({ major: newMajor });
                    }}>Add a major</Button>
                }
            </div>
        )
    }

    // renderMajor = () => {
    //     return (
    //         <Input type="select"
    //                value={this.state.major.name || ''}
    //                onChange={({ target }) => {
    //                    // this.setState({ major: {name: target.value} });
    //                    this._updateMajor(target.value);
    //                }}>
    //             <option value="" disabled>SELECT A MAJOR</option>
    //             {majors.sort().map((major, i) => {
    //                 return <option key={i} value={major}>{major}</option>;
    //             })}
    //         </Input>
    //     );
    // }

    renderSingleMinor = (minorName, index) => {
        return (
            <div className="select-entry">
                <InputGroup key={index}>
                    <Input type="select"
                           value={minorName || ''}
                           onChange={({ target }) => {
                               this._updateMinor(target.value, index);
                           }}>
                        <option key={-1} value="" disabled>SELECT A MINOR</option>
                        {majors.sort().map((major, i) => { // assuming possibility of minors are same as that of majors
                            return <option key={i} value={major}>{major}</option>;
                        })}
                    </Input>
                    <Button className="remove" onClick={() => {
                        this._updateMinor(null, index);
                    }}>Delete</Button>
                </InputGroup>
            </div>
        );
    }

    renderMinor = () => {
        const {
            minor: currMinor,
        } = this.state;

        let displayList = currMinor.map((e, i) => this.renderSingleMinor(e.name || '', i));

        const canAddMinor = currMinor.length === 0 || (currMinor.length < 3 && currMinor[currMinor.length-1].name !== '');

        return (
            <div>
                {displayList}
                {canAddMinor &&
                    <Button
                        className="add"
                        onClick={() => {
                        let newMinor = currMinor.slice();
                        newMinor.push({name: ''});
                        this.setState({ minor: newMinor });
                    }}>Add a minor</Button>
                }
            </div>
        )
    }

    // renderMinor = () => {
    //     return (
    //         <Input type="select"
    //                value={this.state.minor.name || ''}
    //                onChange={({ target }) => {
    //                    // this.setState({ minor: {name: target.value} });
    //                    this._updateMinor(target.value);
    //                }}>
    //             <option value="" disabled>SELECT A MINOR</option>
    //             {majors.sort().map((major, i) => { // assuming possibility of minors are same as that of majors
    //                 return <option key={i} value={major}>{major}</option>;
    //             })}
    //         </Input>
    //     );
    // }

    render() {
        const isActive = this.props.mentor.active;

        if (isActive) {
            return (
                <MuiThemeProvider>
                    <div className="profile">
                        <div className="ambassador-profile">
                            <FormGroup className="major">
                                <Label>Major</Label>
                                {this.renderMajor()}
                            </FormGroup>
                            <FormGroup className="minor">
                                <Label>Minor</Label>
                                {this.renderMinor()}
                            </FormGroup>
                            <FormGroup className="bio">
                                <Label>Bio</Label>
                                {this.renderBio()}
                            </FormGroup>
                            <FormGroup className="classes-taken">
                                <Label>Classes Taken:</Label>
                                {this.renderClasses()}
                            </FormGroup>
                            <div>
                                <div className="cancel" onClick={() => this.props.updateMentorStatus(false)}>I am no longer available</div>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            );
        } else {
            return (
                <MuiThemeProvider>
                    <div className="profile">
                        <div className="ambassador-profile">
                            <h3>What it means to be an ambassador</h3>
                            <ul>
                                <li>If you don’t use your UCLA email or check it often, make sure you update your preferred email.</li>
                                <li>If you signed up to be an ambassador, activate and fill out your Ambassador Profile.</li>
                                <li>If you’re looking for an ambassador, click “Ambassadors” up top, and send out a request to meet with an ambassador on campus.</li>
                                <li>Please remember ambassadors are just students who wants to help you. You should buy them a cup of coffee as a thank you for their time.</li>
                            </ul>
                            <Button className="activate" onClick={() => this.props.updateMentorStatus(true)}>Become a Ambassador</Button>
                        </div>
                    </div>
                </MuiThemeProvider>
            );
        }
    }
}

export default AmbassadorProfile;
