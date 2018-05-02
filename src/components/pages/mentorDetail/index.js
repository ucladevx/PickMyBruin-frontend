import React from 'react';
import { Button, Alert } from 'reactstrap';

import { getName } from 'common';
import ProfileTop from '../profile/profileTop';
import NewRequestField from './newRequestField';
import Results from '../search/results';

import Navbar from '../../navbar';

class MentorDetail extends React.Component {
    _renderForm = () => {
        // checks that we have not already tried to request this mentor
        if (this.props.mentor.canNotRequest) {
            return (
                <Alert color="warning">You have already requested this ambassador</Alert>
            );
        } 
        return (
            <NewRequestField 
                mentorName={getName(this.props.mentor.profile.get('user'))}
                sendRequest={this._sendRequest}
            />
        );
    }

    _sendRequest = (message) => {
        //TODO: fix this shit this ugly
        this.props.sendRequest(message, this.props.mentor.profile.getIn(['profile', 'id']));
    }

    render() {
        const {
            profile,
        } = this.props.mentor;

        let key = 1;

        return (
            <div className="mentor-detail-container">
                <Navbar />
                <div className="content">
                    <div className="results">
                        <Results 
                            mentors={this.props.mentors.filter((mentorProfile) => {
                                return mentorProfile.getIn(['mentor', 'id']) != profile.getIn(['mentor', 'id'])
                            })} 
                        />
                    </div>
                    <div className="profile">
                        <ProfileTop 
                            name={`${profile.getIn(['user', 'first_name'])} ${profile.getIn(['user', 'last_name'])}`}
                            profile = {profile}
                        />
                        <div className="mentor-details">
                            <div className="heading about-major-heading">
                                <i className="fa fa-user-o" aria-hidden="true"></i>
                                <h1>About Me</h1>
                            </div>
                            <div className="about-major">
                                <p>{profile.getIn(['mentor','bio'])}</p>
                            </div>
                            <div className="heading my-classes-heading">
                                <i className="fa fa-book" aria-hidden="true"></i>
                                <h1>My Classes</h1>
                            </div>
                            <div className="my-classes">
                                <ul>
                                    {
                                        profile.getIn(['mentor', 'courses']).map(className => {
                                            key += 1;
                                            return <li key={key}>{className.get('name')}</li>
                                        })
                                    }
                                </ul>
                            </div>
                            {this._renderForm()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MentorDetail;
