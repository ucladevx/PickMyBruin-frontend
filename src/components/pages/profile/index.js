import React from 'react';
import { toJS } from 'immutable';

import ProfileTop from './profileTop';
import General from './general';
import Mentorship from './mentorship';

import NavBar from '../../navbar';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.profile.get('user').toJS(),
            mentor: props.profile.get('mentor').toJS()
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            user: props.profile.get('user').toJS(),
            mentor: props.profile.get('mentor').toJS()
        });
    }
    
    _handleChangeStatus = (_, value) => {
        this.props.updateMentorStatus(value);
    }

    render() {
        if (!this.state.user.id) {
            return null;
        } else {

        return(
            <div className="container-profile">
                <div className="profile-wrapper">
                    <ProfileTop 
                        name={`${this.state.user.first_name} ${this.state.user.last_name}`}
                    /> 
                    <div className="profile-detail-container">
                        <General 
                            user={this.state.user}
                            mentor={this.state.mentor}
                        />
                        <Mentorship 
                            user={this.state.user}
                            mentor={this.state.mentor}
                            updateMentorStatus={this._handleChangeStatus}
                        />
                    </div>
                </div>
                <NavBar />
            </div>
        );
        }
    }
}

export default Profile;
