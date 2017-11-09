import React from 'react';

import ProfileBody from './profileBody';

class Profile extends React.Component {
    render() {
        return(
            <div className="container-profile">
               <ProfileBody /> 
            </div>
        );
    }
}

export default Profile;
