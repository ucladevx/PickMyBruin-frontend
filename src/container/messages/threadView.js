import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import ThreadView from 'components/pages/messages/threadView';

class ThreadViewContainer extends React.Component {
    state = {
        loading: false
    }

    componentDidMount() {
        if (this.props.profileId) {
            this.setState({
                loading: true
            });
            this.props.fetchMessages(this.props.profileId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profileId !== this.props.profileId) {
            this.props.fetchMessages(nextProps.profileId);
            return this.setState({
                loading: true
            })
        } else {
            this.setState({
                loading: false
            });
        }
    }
    
    render() {
        return (
            <ThreadView
                loading={this.state.loading}
				messages={this.props.messages}
				currentUser={this.props.profile.get('user').get('id')}
			/>
        );
    }
}

const mapStateToProps = state => {
    const profile = state.Messages.get('profileViewing');

    return {
		profile: state.Profile,
        messages: profile.get('messages'),
	};
}

const mapDispatchToProps = dispatch => {
    return {
        fetchMessages: id => {
            dispatch(Actions.messagesActions.fetchMessages(id));
        }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadViewContainer);
