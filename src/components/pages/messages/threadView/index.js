import React from 'react';

class ThreadView extends React.Component {
    render() {
        return (
            <div className="thread-view">
            	<h4 className="beginningText">This is the beginning of your conversation.</h4>
            	<div className="messageHistory">
            	</div>
            </div>
        );
    }
}

export default ThreadView;
