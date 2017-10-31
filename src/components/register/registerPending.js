import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { replace } from 'react-router-redux';

class RegisterPending extends React.Component {
    componentWillMount() {
        if (!this.props.sentEmail) {
            this.props.redirectHome();
        }
    }
    render() {
        return(
            <div className="container-pending">
                <div className="pending-text">
                    A verification link has been sent to <strong>{this.props.email}</strong>,
                    please click on the link in your mailbox to continue the registration
                </div>
                <div className="pending-registration-btns">
                    <div className="pending-btn"><Button color="primary" block>Back</Button></div>
                    <div className="pending-btn"><Button color="primary" block>Resend Link</Button></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const RegisterState = state.Register;
    return {
        email: RegisterState.getIn(['user', 'email'], ''),
        sentEmail: RegisterState.get('sentEmail')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirectHome: () => {
            dispatch(replace('/'));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPending);