import React from 'react';

import Search from '../../searchBar';
import ProfilePic from './profilePicture';

class ProfileTop extends React.Component {
    render() {
        return(
            <div className="top">
                <div className="user-info">
                    <ProfilePic 
                        profile={this.props.profile}
                        setProfilePic = {this.props.setProfilePic}
                    />
                    <h1>{this.props.name}</h1>
                </div>
            </div>
        );
    }
}

export default ProfileTop;

