import React from 'react';

class Mentorship extends React.Component {

    renderAddClasses = () => {
        return <h2>Add Classes <i className="fa fa-plus" aria-hidden="true"></i></h2>
    }

    renderAddMajor = () => {
        return <h2>Add Major <i className="fa fa-plus" aria-hidden="true"></i></h2>
    }

    render() {

        const mentorshipStatus = this.props.mentorshipStatus || 'OFF';
        const major = null;
        const classesTaken = null;

        return(
            <div className="mentorship">
                <div className="heading">
                    <i className="fa fa-users fa-lg" aria-hidden="true"></i>
                    <h1>Mentorship</h1>
                </div>
                <div className="body">
                    <div className="mentorship-status">
                        <h2>Mentorship Status:</h2>
                        <h2>{mentorshipStatus}</h2>
                    </div>
                    <div className="major">
                        <h2>Major:</h2>
                        {major ? <h2>major</h2> : this.renderAddMajor()}
                    </div>
                    <div className="classes-taken">
                        <h2>Classes Taken:</h2>
                        {classesTaken ? <h2>classesTaken</h2> : this.renderAddClasses()}
                    </div>
                </div>
                {/*
                <div className="banner">
                    <p>Are you an upperclassman who's passionate about your major? Become a mentor and spread your wisdom!</p>
                </div>
                */}
            </div>
        );
    }
}

export default Mentorship;