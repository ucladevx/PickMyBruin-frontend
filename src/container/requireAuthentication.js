import React from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';

import { Actions } from '../reducer';

import Loading from '../components/loading';

export default function(ComposedComponent) {

    class Authentication extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                fetching: false
            }
        }

        componentWillMount() {
            if (!this.props.isLoggedIn) {
                return this.props.login(this.props.path);
            }
        }

        componentDidMount() {
            if (this.props.isLoggedIn && !this.props.isProfileFetched) {
                this.setState({
                    fetching: true
                });
                this.props.fetchProfile();
            }
        }

        componentWillReceiveProps(nextProps) {
            if (!nextProps.isLoggedIn) {
                return this.props.login();
            }
            this.setState({
                fetching: false
            })

            if (!nextProps.isProfileVerified) {
                return this.props.redirectToPending();
            }
        }

        render() {
            if (this.state.fetching) {
                return <Loading />;
            } else {
                return <ComposedComponent {...this.props} />;
            }
        }
    }

    const mapStateToProps = state => {
        const Login = state.Login;
        const Profile = state.Profile;

        return {
            isLoggedIn: Login.get('authenticated'),
            isProfileFetched: !!Profile.getIn(['user', 'id']),
            isProfileVerified: Profile.getIn(['user', 'verified']),
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            login: path => {
                dispatch(Actions.loginActions.loginAndRedirect(path));
            },
            fetchProfile: () => {
                dispatch(Actions.profileActions.fetchProfile());
            },
            redirectToPending: () => {
                dispatch(replace("/register/pending"));
            },
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}
