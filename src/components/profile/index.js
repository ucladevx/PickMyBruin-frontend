import React from 'react';

import ProfileTop from './profileTop';
import General from './general';
import Mentorship from './mentorship';
import Search from '../searchBar';

class Profile extends React.Component {
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return(
            <div className="container-profile">
                <div className="profile-search">
                    <Search 
                        handleSearch={this.props.handleSearch}
                    />
                </div>
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
