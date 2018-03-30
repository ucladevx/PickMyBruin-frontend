import React from 'react';

import ProfilePicture from 'components/profilePicture';

class ThreadPreview extends React.Component {
    render() {
        return (
            <div className="thread-preview-container">
                <ProfilePicture profile={this.props.profile} small/>
            </div>
        );
    }
}

export default ThreadPreview;