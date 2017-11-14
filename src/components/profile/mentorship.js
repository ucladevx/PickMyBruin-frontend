import React from 'react';

class Mentorship extends React.Component {
    render() {

        const mentorshipStatus = this.props.mentorshipStatus || 'OFF';
        return(
            <div className="mentorship">
                <div className="heading">
                    <i className="fa fa-users fa-lg" aria-hidden="true"></i>
                    <h1>Mentorship</h1>
                </div>
                <div className="body">
                    <h2>Mentorship Status: <span className="mentorship-status">{mentorshipStatus}</span></h2>
                </div>
                <div className="banner">
                    <p>Are you an upperclassman who's passionate about your major? Become a mentor and spread your wisdom!</p>
                </div>
            </div>
        );
    }
}

export default Mentorship;