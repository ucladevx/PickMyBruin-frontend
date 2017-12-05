import React from 'react';
import { Button, Alert } from 'reactstrap';

import ProfileTop from '../profile/profileTop';
import NewRequestField from './newRequestField';
import Results from '../search/results';

class MentorDetail extends React.Component {
    state = {
        renderTextField: false
    }

    handleOpen = () => {
        this.setState({
            renderTextField: true
        });
    }

    handleClose = () => {
        this.setState({
            renderTextField: false
        });
    }

    _renderForm = () => {
        // checks that we have not already tried to request this mentor
        if (this.props.mentor.hasRequested) {
            return (
                <Alert color="warning">You have already requested this ambassador</Alert>
            );
        } 
        if (this.state.renderTextField) {
            return (
                <NewRequestField 
                    mentorName={this.props.mentor.profile.get('name')}
                    cancel={this.handleClose}
                    sendRequest={this._sendRequest}
                />
            );
        } else {
            return <Button color="primary" onClick={this.handleOpen}>Request</Button>;
        }
    }

    _sendRequest = (message) => {
        this.props.sendRequest(message, this.props.mentor.profile.get('id'));
    }

    render() {
        const {
            profile,
        } = this.props.mentor;

        const {
            renderTextField
        } = this.state;

        let key = 1;

        return (
            <div className="mentor-detail-container">
                <div className="results">
                    <Results mentors={this.props.mentors} />
                </div>
                <div className="profile">
                    <ProfileTop 
                        name={profile.get('name')}
                    />
                    <div className="mentor-details">
                        <div className="about-major-heading heading">
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            <h1>About Me</h1>
                        </div>
                        <div className="about-major">
                            <p>{profile.get('bio')}</p>
                        </div>
                        <div className="heading my-classes-heading">
                            <i className="fa fa-book" aria-hidden="true"></i>
                            <h1>My Classes</h1>
                        </div>
                        <div className="my-classes">
                            <ul>
                                {
                                    profile.get('classes').map(className => {
                                        key += 1;
                                        return <li key={key}>{className}</li>
                                    })
                                }
                            </ul>
                        </div>
                        {this._renderForm()}
                    </div>
                </div>
            </div>
        );
    }
}

export default MentorDetail;