import React from 'react';


class ProfilePicStatic extends React.Component {

    render() {
    	const url = this.props.profile_pic ? this.props.profile_pic : 'http:\/\/www.iconninja.com/files/373/611/612/person-user-profile-male-man-avatar-account-icon.svg'

        return(        	
            <div className="profile-pic" style={{backgroundImage: 'url('+url+')'}}></div>	        
        )
    }
}

export default ProfilePicStatic;