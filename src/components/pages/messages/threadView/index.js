import React from 'react';
import Message from './message'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ThreadView extends React.Component {
    render() {
        return (
			<MuiThemeProvider>
            <div className="thread-view">
			<h4 className="beginningText">This is the beginning of your conversation.</h4>
				<div className="all_messages">
					{this.props.thread.reverse().map(message => {
						return (
							<Message
								message_text={message.get('body')}
								msg_sender={message.get('sender').get('id')}
								curr_user={this.props.curr_user}
								/>
							);
					})}
				</div>
			</div>
			</MuiThemeProvider>
        );
    }
}

export default ThreadView;
