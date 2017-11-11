import React from 'react';

import ProfileTop from './profileTop';
import ProfileMiddle from './profileMiddle';
import ProfileBottom from './profileBottom';

class Profile extends React.Component {
    render() {
        return(
            <div className="container-profile">
               <ProfileTop /> 
               <ProfileMiddle />
               <ProfileBottom />
            </div>
        );
    }
}

export default Profile;
