import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';

import { Actions } from '../reducer';

export default function(ComposedComponent) {

    class Authentication extends React.Component {
        componentWillMount() {
            if (!this.props.isLoggedIn) {
                this.props.login();
            }
            if (!this.props.isProfileFetched) {
                this.props.fetchProfile();
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.isLoggedIn) {
                this.props.login();
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    const mapStateToProps = state => {
        const Login = state.Login
        const Profile = state.Profile
        return {
            isLoggedIn: Login.get('authenticated'),
            isProfileFetched: !!Profile.getIn(['user', 'id'])
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            login: () => {
                dispatch(replace("/login"));
            },
            fetchProfile: () => {
                dispatch(Actions.profileActions.fetchProfile());
            }
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}
