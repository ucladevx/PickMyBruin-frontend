import React from 'react';


class ProfilePicStatic extends React.Component {

    _renderPic = () => {
        const url = this.props.profile_pic

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
            <div>       	
                {this._renderPic()}	   
            </div>     
        )
    }
}

export default ProfilePicStatic;

