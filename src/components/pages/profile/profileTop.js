import React from 'react';

import Search from '../../searchBar';
import ProfilePicEditable from './profilePictureEditable';
import ProfilePic from './profilePicture';

class ProfileTop extends React.Component {
    _profilePic = () => {
        return this.props.editable ? <ProfilePicEditable 
                                    profile={this.props.profile}
                                    setProfilePic = {this.props.setProfilePic}
                                /> : 
                                <ProfilePic 
                                    profile={this.props.profile}
                                />
                        }

    render() {
        console.log('here')
        return(
            <div className="top">
                <div className="user-info">
                    {this._profilePic()}
                    <h1>{this.props.name}</h1>
                </div>
            </div>
        );
    }
}

ProfileTop.defaultProps = {
    editable: false
}

export default ProfileTop;