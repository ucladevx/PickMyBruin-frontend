import React from 'react';
import ReactFileReader from 'react-file-reader';

class ProfilePic extends React.Component {

	_handleFiles = files => {
  		this.props.setProfilePic(files[0]) // put it in index.js profile 
	}	

    render() {
    	const url = this.props.profile.getIn(['user','picture']) ? this.props.profile.getIn(['user','picture']) : 'http:\/\/www.iconninja.com/files/373/611/612/person-user-profile-male-man-avatar-account-icon.svg'

        return(
        	<ReactFileReader fileTypes={[".jpg",".png",".svg",".jif"]} multipleFiles={false} handleFiles={this._handleFiles}>
	            <div className="profile-pic" style={{backgroundImage: 'url('+url+')'}}>
	            </div>
	        </ReactFileReader>
        )
    }
}

export default ProfilePic;



