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
                    <div className="notifications">
                        <h2>Notifications:</h2>
                        <h2>{notifications}</h2>
                    </div>
                    <div className="preferred-email">
                        <h2>Preferred Email:</h2>
                        <h2>{preferredEmail}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default General;