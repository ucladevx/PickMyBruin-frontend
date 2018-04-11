import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import ThreadView from 'components/pages/messages/threadView';

class ThreadViewContainer extends React.Component {
	componentDidMount() {
		this.props.fetchThread()
    }

    render() {
        return (
            <ThreadView
				thread={this.props.thread}
				msgs_count={this.props.msgs_count}
				curr_user={this.props.profile.get('user').get('id')}
			/>
        );
    }
}

const mapStateToProps = state => {
    return {
		profile: state.Profile,
		msgs_count: state.Message.get('count'),
        thread: state.Message.get('thread')
	};
}

const mapDispatchToProps = dispatch => {
    return {
		fetchThread: () => {
            dispatch(Actions.messageActions.fetchThread());
        },
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadViewContainer);
