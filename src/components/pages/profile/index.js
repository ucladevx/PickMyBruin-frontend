import React from 'react';

import ProfileTop from './profileTop';
import General from './general';
import Mentorship from './mentorship';

import NavBar from '../../navbar';

class Profile extends React.Component {
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return(
            <div className="container-profile">
                <NavBar />
                <div className="profile-wrapper">
                    <ProfileTop 
                        handleSearch={this.props.handleSearch}
                    /> 
                    <div className="profile-detail-container">
                        <General />
                        <Mentorship />
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
