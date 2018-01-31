import React from 'react';
import ReactFileReader from 'react-file-reader';
import placeholder from '../../../../images/profile/placeholder_profile.png';

class ProfilePic extends React.Component {

	_handleFiles = files => {
  		this.props.setProfilePic(files[0]) 
	}	

	_renderPic = () => {
 		const url = this.props.profile.getIn(['user','picture'])
        if (url) {
            return (
                <div className="profile-pic" style={{backgroundImage: 'url('+url+')'}}>
	            </div>
            );
        } else {
            return <div className="profile-pic" src={placeholder} alt="placeholder">
	            </div>;
        }
    }

    render() {

        return(
        	<ReactFileReader fileTypes={[".jpg",".png",".svg",".jif"]} multipleFiles={false} handleFiles={this._handleFiles}>
	            {this._renderPic()}
	        </ReactFileReader>
        )
    }
}

export default ProfilePic;

