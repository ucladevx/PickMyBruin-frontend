import React from 'react';
import Message from './message'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ThreadView extends React.Component {
    render() {
		const messages = this.props.messages;
		console.log(this.props);
        return (
			<MuiThemeProvider>
            <div className="thread-view">
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
			</MuiThemeProvider>
        );
    }
}

export default ThreadView;
