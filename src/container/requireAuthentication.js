import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export default function(ComposedComponent) {

    class Authentication extends React.Component {
        componentDidMount() {
            if (!this.props.isLoggedIn) {
                this.props.login();
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
        return {
            isLoggedIn: Login.get('loginSuccess')
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            login: () => {
                dispatch(push("/login"));
            }
        };
    }

    return connect(mapStateToProps, mapDispatchToProps)(Authentication)
}