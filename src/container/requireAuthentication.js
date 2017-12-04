import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Actions } from '../reducer';

export default function(ComposedComponent) {

    class Authentication extends React.Component {
        componentDidMount() {
            if (!this.props.isLoggedIn) {
                this.props.login();
            }
            if (!this.props.isProfileFetched) {
                this.props.fetchProfile();
            }
        }

        render() {
            if (this.props.isLoggedIn) {
                return <ComposedComponent {...this.props} />;
            } else {
                return null;
            }
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
                dispatch(push("/login"));
            },
            fetchProfile: () => {
                dispatch(Actions.profileActions.fetchProfile());
            }
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}