import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import Sidebar from 'components/pages/messages/sidebar';

class SidebarContainer extends React.Component {
    componentDidMount() {
        this.props.fetchThreads()
    }
    
    render() {
        return (
            <Sidebar 
                profile={this.props.profile}
                threads={this.props.threads}
                count={this.props.count}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.Profile,
        threads: state.Messages.get('threads'),
        count: state.Messages.get('count'),
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchThreads: () => {
            dispatch(Actions.messagesActions.fetchThreads());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);

