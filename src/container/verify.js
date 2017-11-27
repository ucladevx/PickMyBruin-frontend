import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { bindActionCreators } from 'redux'
import { parse } from 'qs';

import { Actions } from '../reducer';

class VerifyUserContainer extends React.Component {
    componentWillMount() {
        const query = parse(this.props.location.search.substr(1));
        this.props.confirmVerificationCode(query.code);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.verifiedEmail) {
            this.props.finishRegistration();
        }   
    }

    render() {
        return (
            <div></div>
        );
    }
}

const mapStateToProps = state => {
    const Register = state.Register;
    return {
        verifiedEmail: Register.get('verifiedEmail')
    };
}

const mapDispatchToProps = dispatch => {
    return {
        confirmVerificationCode: bindActionCreators(Actions.registerActions.confirmCode, dispatch),
        finishRegistration: () => {
            dispatch(replace('/completeRegistration'));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUserContainer);