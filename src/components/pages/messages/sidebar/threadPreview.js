import React from 'react';

import ProfilePicture from 'components/profilePicture';
import { getName } from 'common';

class ThreadPreview extends React.Component {
    render() {
        const profile = this.props.thread.get('other_profile');
        const message = this.props.thread.get('recent_message');
        return (
            <div className="thread-preview-container" onClick={() => this.props.onClick(profile.get('id'))}>
                <ProfilePicture picture={profile.get('picture')} small/>
                <div className="message-preview">
                    <h1>{getName(profile)}</h1>
                    <p>{message.get('body')}</p>
                </div>
            </div>
        );
    }
}

export default ThreadPreview;