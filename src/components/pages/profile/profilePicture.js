import React from 'react';
import ReactFileReader from 'react-file-reader';

class ProfilePic extends React.Component {

	_handleFiles = files => {
  		this.props.setProfilePic(files) // put it in index.js profile 
	}	

	renderProfilePic = () => {
		if (!this.props.profile_pic) {
			return (
				<img src="http://www.iconninja.com/files/373/611/612/person-user-profile-male-man-avatar-account-icon.svg"/>
			);
		} else {
			return (
				<img src= {this.props.profile_pic} />
			);
		}
	}

    render() {
        return(
        	<ReactFileReader fileTypes={[".jpg",".png",".svg",".jif"]} multipleFiles={false} handleFiles={this._handleFiles(files[0]["name"])}>
	            <div className="profile-pic">
	                {this.renderProfilePic()}
	            </div>
	        </ReactFileReader>
        )
    }
}

export default ProfilePic;



