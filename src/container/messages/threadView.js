import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import ThreadView from 'components/pages/messages/threadView';

class ThreadViewContainer extends React.Component {
    render() {
        return (
            <ThreadView />
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadViewContainer);

