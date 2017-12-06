import React from 'react';

import Search from '../../searchBar';
import ProfilePic from './profilePicture';

class ProfileTop extends React.Component {
    render() {
        const name = `${this.props.profile.getIn(['user', 'first_name'])} ${this.props.profile.getIn(['user', 'last_name'])}` || "Joe Bruin";
        return(
            <div className="top">
                <div className="user-info">
                    <ProfilePic />
                    <h1>{name}</h1>
                </div>
            </div>
        );
    }
}

export default ProfileTop;