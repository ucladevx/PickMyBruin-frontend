import React from 'react';

import ProfileTop from './profileTop';
import General from './general';
import Mentorship from './mentorship';

import NavBar from '../../navbar';

class Profile extends React.Component {
    render() {
        return(
            <div className="container-profile">
                <div className="profile-wrapper">
                    <ProfileTop 
                        handleSearch={this.props.handleSearch}
                    /> 
                    <div className="profile-detail-container">
                        <General />
                        <Mentorship />
                    </div>
                </div>
                <NavBar />
            </div>
        );
    }
}

export default Profile;
