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
            profile: props.profile.toJS()
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            profile: props.profile.toJS()
        });
    }

    _handleToggleMentorship = (status) => {

    }

    render() {
        if (!this.state.profile.user.id) {
            return null;
        } else {
            console.log('here');
        return(
            <div className="container-profile">
                <div className="profile-wrapper">
                    <ProfileTop 
                        profile={this.state.profile}
                    /> 
                    <div className="profile-detail-container">
                        <General 
                            profile={this.state.profile}
                        />
                        <Mentorship 
                            profile={this.state.profile}
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
