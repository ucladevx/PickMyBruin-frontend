import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Actions } from '../reducer';
import CompleteRegistration from '../components/pages/completeRegistration';

class CompleteRegistrationContainer extends React.Component {
    componentDidMount() {
        if (this.props.registerSuccess) {
            this.props.redirectToProfile();
        }
    }
    render() {
        return (
            <CompleteRegistration 
                completeRegistration={this.props.completeRegistration}
            />
        );
    }
}

const mapStateToProps = state => {
    const Register = state.Register;
    return {
        registerSuccess: Register.get('registerSuccess')
    };
}

const mapDispatchToProps = dispatch => {
    return {
        completeRegistration: (fullName, year) => {
            dispatch(Actions.registerActions.completeRegistration(fullName, year));
        },
        redirectToProfile: () => {
            dispatch(push("/profile"));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteRegistrationContainer);