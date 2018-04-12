import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import Input from 'components/pages/messages/input';

class InputContainer extends React.Component {
    render() {
        return (
            <Input sendMessage={this.props.sendMessage} />
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {
    	sendMessage: (message) => {
    		dispatch(Actions.messagesActions.sendMessage(message));
    	}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);

