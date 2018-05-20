import React from 'react';

class ColumnRight extends React.Component {
    render() {
        return (
            <div className="column-right">
                <div className="bio">
                    <h2>Bio</h2>
                    <p>{this.props.bio}</p>
                </div>
                <div className="classes-taken">
                    <h2>Classes I've Taken</h2>
                </div>
            </div>
        );
    }
}

export default ColumnRight;