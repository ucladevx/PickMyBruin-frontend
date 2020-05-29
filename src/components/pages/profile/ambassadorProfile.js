import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChipInput from 'material-ui-chip-input';
import Chip from 'material-ui/Chip';

import { Button, Input, FormGroup, Label, InputGroup } from 'reactstrap';

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
        borderColor: '#c3d887'
    },
    blurb: {
        paddingLeft:"4%",
        margin:"2%",
        lineHeight:"1.5em",
        fontSize: "90%"
    },
    chip: {
        margin: 4,
        display: 'inline-block',
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },

};

// sort newArr based on sequence of origArr and merge them, using f as key function and g for reconstruction
// Idea is: sort first based on origArr seq; if there are more entries added in newArr,
// concat only after going through the sorting of origArr for 1 round;
// eventually, concat entries in origArr but not in newArr to the very end
// O(M+N) LOL
const relativeSortAndMerge = (origArr, newArr, f, g) => {
    let newArrMap = new Map();
    for (const a of newArr) {
        const key = f(a);
        newArrMap.set(key, (newArrMap.get(key) || 0) + 1);
    }

    let sortedNewArr = [];
    let surplusOrigArr = [];
    for (const b of origArr) {
        const key = f(b);
        if (newArrMap.has(key)) {
            sortedNewArr.push(g(key));
            newArrMap.set(key, newArrMap.get(key) - 1);
            if (newArrMap.get(key) <= 0) {
                newArrMap.delete(key);
            }
        } else {
            surplusOrigArr.push(g(key));
        }
    }

    for (const [key, value] of newArrMap) {
        for (let i = 0; i < value; i++) {
            sortedNewArr.push(g(key));
        }
    }

    return sortedNewArr.concat(surplusOrigArr);
};

class AmbassadorProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classesOpen: false,
            bio: props.mentor.bio,
            grad: props.mentor.grad,
            quarter: props.mentor.quarter,
            // major: props.mentor.major || {name: ''},
            // minor: props.mentor.minor || {name: ''},
            major: props.mentor.major || [],
            minor: props.mentor.minor || [],
            majorDisplayLength: props.mentor.major ? props.mentor.major.length : 0,
            minorDisplayLength: props.mentor.minor ? props.mentor.minor.length : 0,
            courses: props.mentor.courses ? props.mentor.courses.map(obj => obj.name) : [],
            work: props.mentor.work || []
        }
    }

    componentWillReceiveProps(nextProps) {
        let {
            major: currMajor,
            minor: currMinor,
            work: currWork,
        } = this.state;

        let {
            major: nextMajor,
            minor: nextMinor,
            work: nextWork,
        } = nextProps.mentor;
        nextMajor = nextMajor || []; // avoid undefined
        nextMinor = nextMinor || []; // avoid undefined
        nextWork = nextWork || [];

        // The following lines are considered a hack
        // (as it is based on the assumption: when currMajor.length > nextMajor.length, the user must be editing other fields while not selecting the yet to select major)
        if (currMajor.length > nextMajor.length) { // check if we have unsaved empty major <select />
            nextMajor.push({ name: '' });
        }

        if (currMinor.length > nextMinor.length) { // check if we have unsaved empty minor <select />
            nextMinor.push({ name: '' });
        }

        // conduct relative sort of new data based on old data to avoid confusion


        this.setState({
            bio: nextProps.mentor.bio,
            // major: nextProps.mentor.major,
            // minor: nextProps.mentor.minor || {name: ''},
            quarter: nextProps.mentor.quarter,
            major: relativeSortAndMerge(currMajor, nextMajor, e => e.name, n => { return { name: n }; }),
            minor: relativeSortAndMerge(currMinor, nextMinor, e => e.name, n => { return { name: n }; }),
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
                    <div>
                        <Button size="sm" className="edit-class-btn" onClick={() => this.openField("classesOpen")}>Add Classes</Button>
                    </div>
                    // <p onClick={() => this.openField("classesOpen")}>
                    //     <i className="fa fa-plus" aria-hidden="true"></i>
                    //     &nbsp;Add Classes
                    // </p>
                );
            } else {
                return this.renderEditClasses();
            }
        } else {
            if (!this.state.classesOpen) {
                return (
                    <div className="text-and-edit">
                        <div className="courses">
                            {this.props.mentor.courses.map((course, key) => {
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

    renderGrad = () => {
    	return (
    		<InputGroup>
    			<Input 
    			type="select" 
    			name="quarter" 
    			id="quarter" 
    			className="rounded"
    			style={{marginRight: '10px', flex: '0 0 7.5em'}}
    			value={this.state.quarter}
                onChange={e => this.setState({quarter: e.target.value})}>
                    <option value="Spring">Spring</option>
	                <option value="Fall">Fall</option>
	                <option value="Winter">Winter</option>
	            </Input>
	        	<Input name="grad-year" id="grad-year" className="rounded" style={{flex: '0 0 10em'}} placeholder="Enter Year" onChange={e => this.setState({grad: e.target.value})} value={this.state.grad}/>  
    		</InputGroup>

    	);
    }

    renderSingleWork = (position, company, start, end, index) => {
        return (
            // Implement value storage and update for each field once backend finishes up
            // Yes, I know the inline CSS is terrible. It will be cleaned in another commit I promise :)
            <div style={{borderStyle: 'solid', borderWidth: '1px', borderRadius: '.25rem', borderColor: 'lightgray', marginTop: '10px', marginBottom: '10px'}}>
                <InputGroup style={{margin: '10px', flexWrap: 'wrap'}}>    
                    <Input name="work-position" id="work-position" className="rounded" style={{marginRight: '10px', flex: '0 0 15em'}} placeholder="Position" onChange={null}/>  
                    <Input name="work-company" id="work-company" className="rounded" style={{marginLeft: '10px', flex: '0 0 20em'}} placeholder="Company" onChange={null}/>  
                </InputGroup>
                <InputGroup style={{margin: '10px', flexWrap: 'wrap'}}>
                    <Input name="start-year" id="start-year" className="rounded" style={{marginRight: '10px', flex: '0 0 15em'}} placeholder="Start Year" onChange={null}/>  
                    <Input name="end-year" id="end-year" className="rounded" style={{marginLeft: '10px', marginRight: '10px', flex: '0 0 10em'}} placeholder="End Year" onChange={null}/>
                    <Label check style={{paddingTop: '5px'}}>
                      <Input type="checkbox" />{' '}
                      Check if current position
                    </Label>
                </InputGroup>
                <InputGroup style={{margin: '10px'}}>
                    <Button size="sm" className="add" style={{marginRight: '5px'}} onClick={null}>Save Experience</Button>
                    <Button size="sm" className="remove" onClick={() => {this._deleteWork(index);}}>Delete Entry</Button>
                </InputGroup>
            </div>
        );
    }

    renderWork = () => {

        const {
            work: currWork,
        } = this.state;

        let displayList = currWork.map((e, i) => this.renderSingleWork(e.position || '', e.company || '', e.start || '', e.end || '', i));

        return (
            <div>
                {displayList}
                <Button className="add" onClick={() => {
                    let newWork = currWork.slice();
                    newWork.push({position: '', company: '', start: '', end: ''});
                    this.setState({ work: newWork });
                }}>Add Work Experience</Button>
            </div>
        );
    }

    _deleteWork = (index) => {
        const {
            work: currWork,
        } = this.state;

        currWork.splice(index,1);
        this.setState({ work: currWork });
        // Make sure to implement update profile for backend
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
        // remove unexpected empty major
        this.props.updateProfile("major", currMajor.filter(e => !!e.name)); // no setState, wait for receiving new props
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
        // remove unexpected empty minor
        this.props.updateProfile("minor", currMinor.filter(e => !!e.name)); // no setState, wait for receiving new props
    }

    renderSingleMajor = (majorName, index) => {
        return (
            <div className="select-entry" key={index}>
                <InputGroup>
                    <Input type="select"
                           value={majorName || ''}
                           onChange={({ target }) => {
                               this._updateMajor(target.value, index);
                           }}>
                        <option key={-1} value="" disabled>SELECT A MAJOR</option>
                        {majors.sort()
                            .filter((major) => (!(this.state.major.map(e => e.name).includes(major)) || major === majorName)) // either selectable (not selected by other entries), or is currently selected value
                            .map((major, i) => { // assuming possibility of minors are same as that of majors
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
            <div className="select-entry" key={index}>
                <InputGroup>
                    <Input type="select"
                           value={minorName || ''}
                           onChange={({ target }) => {
                               this._updateMinor(target.value, index);
                           }}>
                        <option key={-1} value="" disabled>SELECT A MINOR</option>
                        {majors.sort()
                            .filter((major) => (!(this.state.minor.map(e => e.name)).includes(major) || major === minorName)) // either selectable (not selected by other entries), or is currently selected value
                            .map((major, i) => { // assuming possibility of minors are same as that of majors
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
                            <FormGroup className="grad">
                                <Label>Anticipated Graduation</Label>
                                {this.renderGrad()}
                            </FormGroup>
                            <FormGroup className="bio">
                                <Label>Bio</Label>
                                {this.renderBio()}
                            </FormGroup>
                            <FormGroup className="classes-taken">
                                <Label>Classes Taken</Label>
                                {this.renderClasses()}
                            </FormGroup>
                            <FormGroup className="work">
                                <Label>Work History</Label>
                                {this.renderWork()}
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
