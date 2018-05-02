import React from 'react';

export default ({numMessages, numUnread}) => {
    return (
        <div className="header">
            <h1>{numMessages} Messages</h1>
        </div>
    );
}