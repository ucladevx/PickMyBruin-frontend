import React from 'react';

import ProfilePicture from './profilePicture';
import ProfilePictureEditable from './profilePictureEditable';

export default ({editable, profile, setProfilePic}) => {
    return editable ? <ProfilePictureEditable profile={profile} setProfilePic={setProfilePic}/> : <ProfilePicture profile={profile} />;
}