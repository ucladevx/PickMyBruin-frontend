import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../reducer';
import ForgetPassword from '../components/pages/forget-password';

class ForgetPasswordContainer extends React.Component {
    render() {
        return (
            <ForgetPassword 
                sendResetEmail = {this.props.sendResetEmail}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendResetEmail: (email) => {
            dispatch(Actions.loginActions.sendResetEmail(email));
        },
    };
};

export default connect(null, mapDispatchToProps)(ForgetPasswordContainer);
