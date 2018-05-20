import React from 'react';

import ProfilePicture from 'components/profilePicture';
import Button from 'components/util/Button';
import { getName } from 'common';

class ColumnLeft extends React.Component {
    render() {
        return (
            <div className="column-left">
                <ProfilePicture
                    picture={this.props.profile.get('picture')}
                    size="large"
                />
                <div className="info">
                    <h1>{getName(this.props.profile)}</h1>
                    <p>{this.props.mentor.getIn(['major', 'name'])}</p>
                </div>
                <div className="button-container">
                    <Button color="orange">Send a Message</Button>
                </div>
            </div>
        );
    }
}

export default ColumnLeft;