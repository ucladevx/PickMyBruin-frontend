import React from 'react';

import ProfileTop from '../profile/profileTop';

class MentorDetail extends React.Component {
    render() {
        return (
            <div className="mentor-detail-container">
                <ProfileTop 
                    name={this.props.mentor.get('name')}
                />
                <div className="mentor-details">
                    <div className="about-major-heading heading">
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                        <h1>About My Major</h1>
                    </div>
                    <div className="about-major">
                        <p>{this.props.mentor.get('bio')}</p>
                    </div>
                    <div className="heading my-classes-heading">
                        <i className="fa fa-book" aria-hidden="true"></i>
                        <h1>My Classes</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default MentorDetail;