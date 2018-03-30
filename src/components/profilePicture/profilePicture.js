import React from 'react';


class ProfilePic extends React.Component {

    _renderPic = () => {
        const url = this.props.profile.getIn(['user','picture'])
        let classes = ['profile-pic'];
        if (this.props.small) {
            classes.push('pic-small');
        }

        return (
            <div className={classes.join(' ')} style={{backgroundImage: 'url('+url+')'}}></div>
        );
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
