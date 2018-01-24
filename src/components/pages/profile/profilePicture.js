import React from 'react';
import ReactFileReader from 'react-file-reader';

class ProfilePic extends React.Component {

	_handleFiles = files => {
  		this.props.setProfilePic(files[0]) // put it in index.js profile 
	}	

	renderProfilePic = () => {
		if (!this.props.profile.getIn(['user','picture'])) {
			return (
				<img src="http://www.iconninja.com/files/373/611/612/person-user-profile-male-man-avatar-account-icon.svg"/>

			);

			
		} else {
			return (
				<img src= {this.props.profile.getIn(['user','picture'])} />
			);
		}
	}

    render() {
        return(
        	<ReactFileReader fileTypes={[".jpg",".png",".svg",".jif"]} multipleFiles={false} handleFiles={this._handleFiles}>
	            <div className="profile-pic">
	                {this.renderProfilePic()}
	            </div>
	        </ReactFileReader>
        )
    }
}

export default ProfilePic;



