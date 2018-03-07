import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import Input from 'components/pages/messages/input';

class InputContainer extends React.Component {
    render() {
        return (
            <Input />
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);

