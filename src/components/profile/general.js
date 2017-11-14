import React from 'react';

class General extends React.Component {
    render() {
        const notifications = this.props.notifications || 'ON';
        const preferredEmail = this.props.perferredEmail || 'wdliu@ucla.edu';
        return(
            <div className="general">
                <div className="heading">
                    <i className="fa fa-cog fa-lg" aria-hidden="true"></i>
                    <h1>General</h1>
                </div>
                <div className="body">
                    <h2>Notifications: <span className="notifications">{notifications}</span></h2>
                    <h2>Preferred Email: <span className="preferred-email">{preferredEmail}</span></h2>
                </div>
            </div>
        );
    }
}

export default General;