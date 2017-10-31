import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Actions } from '../reducer';
import Register from '../components/register';

class RegisterContainer extends React.Component {
    render() {
        return(
            <Register 
                sendingEmail={this.props.sendingEmail}
                sendVerificationLink={this.props.sendVerificationLink}
            />
        )
    }
};

const mapStateToProps = state => {
    const RegisterState = state.Register;
    return {
        sendingEmail: RegisterState.get('sendingEmail')
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendVerificationLink: bindActionCreators(Actions.registerActions.sendVerificationLink, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);