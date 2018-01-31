import React from 'react';


class ProfilePic extends React.Component {

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
            <div>       	
                {this._renderPic()}	   
            </div>     
        )
    }
}

export default ProfilePic;