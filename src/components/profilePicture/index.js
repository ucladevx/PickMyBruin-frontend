import React from 'react';

import ProfilePicture from './profilePicture';
import ProfilePictureEditable from './profilePictureEditable';

export default (props) => {
    return (props.editable ?
        <ProfilePictureEditable 
            profile={props.profile} 
            setProfilePic={props.setProfilePic}
        /> : 
        <ProfilePicture 
            profile={props.profile} 
            small={props.small}
        />
    );
}