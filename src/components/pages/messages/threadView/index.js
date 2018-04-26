import React from 'react';
import Message from './message'

class ThreadView extends React.Component {
    componentDidMount() {
        // scroll the messages div to the bottom
        const view = document.getElementById('messages');
        view.scrollTop = view.scrollHeight;
	}

    componentDidUpdate() {
        // scroll the messages div to the bottom
        const view = document.getElementById('messages');
        view.scrollTop = view.scrollHeight;
    }

    render() {
		const messages = this.props.messages;
        return (
            <div id="messages" className="thread-view">
				<div className="all-messages">
					{messages ? messages.reverse().map(message => {
						return (
							<Message
								key={message.get('id')}
								messageText={message.get('body')}
								messageSender={message.get('sender').get('id')}
								currentUser={this.props.currentUser}
							/>
						);
					}) : null}
				</div>
			</div>
        );
    }
}

export default ThreadView;
