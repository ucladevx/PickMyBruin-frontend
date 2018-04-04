import React from 'react';


class ProfilePic extends React.Component {

    _renderPic = () => {
        const url = this.props.picture;
        let classes = ['profile-pic'];
        if (this.props.small) {
            classes.push('pic-small');
        }

        return (
            <div className={classes.join(' ')} style={{backgroundImage: 'url('+url+')'}}></div>
        );
    }

    render() {
        return this._renderPic();
    }
}

export default ProfilePic;
