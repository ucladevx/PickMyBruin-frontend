import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import ThreadView from 'components/pages/messages/threadView';
import Loading from 'components/loading';

class ThreadViewContainer extends React.Component {
    state = {
        loading: false
    }

    componentDidMount() {
        if (this.props.profileId) {
            this.setState({
                loading: true
            });
            this.props.fetchMessagesIfThreadExists(this.props.profileId);
        }
    }

    componentWillReceiveProps() {
        this.setState({
            loading: false
        });
    }
    
    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        return (
            <ThreadView
				messages={this.props.messages}
				curr_user={this.props.profile.get('user').get('id')}
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
        fetchMessagesIfThreadExists: id => {
            dispatch(Actions.messagesActions.fetchMessagesIfThreadExists(id));
        }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadViewContainer);
