import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../reducer';

import ResetPassword from '../components/pages/reset-password';

class ResetPasswordContainer extends React.Component {
    render() {
        return (
            <ResetPassword 
                resetPassword = {this.props.resetPassword}
            />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (password, passwordCode, userId) => {
        	dispatch(Actions.loginActions.resetPassword(password, passwordCode, userId));
        },
    };
};

export default connect(null, mapDispatchToProps)(ResetPasswordContainer);
