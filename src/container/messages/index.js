import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import Config from 'config';

import Input from './input';
import Sidebar from './sidebar';
import ThreadView from './threadView';
import NavBar from 'components/navbar';

class MessagesContainer extends React.Component {
    componentDidMount() {
        const socketId = this.props.profile.getIn(['user', 'id']);
        if (!socketId) {
            return;
        }
        const threadViewingId = this.props.match.params.profileId;

        try {
            this.socket = new WebSocket(`ws://${Config.WS_URL}/${socketId}`);
        } catch (err) {
            console.info(err);
        }
        this.socket.onmessage = event => {
            const message = JSON.parse(event.data);
            if (message.TYPE == 'MESSAGE_UPDATE') {
                this.props.fetchThreads();
                if (threadViewingId) {
                    this.props.fetchMessagesIfThreadExists(threadViewingId);
                }
            }
        }
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }
    }

    render() {
        return (
            <div className="messages-container">
                <div className="messages-wrapper">
                    <Sidebar />
                    <div className="threadview-input-container">
                        <ThreadView 
                            profileId={this.props.match.params.profileId}
                        />
                        <Input />
                    </div>
                </div>
                <NavBar />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.Profile,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThreads: () => {
            dispatch(Actions.messagesActions.fetchThreads);
        },
        fetchMessagesIfThreadExists: id => {
            dispatch(Actions.messagesActions.fetchMessagesIfThreadExists(id));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);

