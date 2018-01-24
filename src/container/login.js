import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, goBack } from 'react-router-redux';
import { Actions } from '../reducer';
import Login from '../components/pages/login';

class LoginContainer extends React.Component {
    componentWillMount() {
        if (this.props.loginSuccess && !this.props.error){
            this.props.redirect()
        };
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.loginSuccess && !nextProps.error){
            nextProps.redirect()
        };
    }

    render() {
        return(
            <Login
                login={this.props.login} // what is this for?
                loginSuccess={this.props.loginSuccess} // why do you need this here?
            />
        ) 
    }
}

const mapStateToProps = state => {
    const LoginState = state.Login;
    return {
        loading: LoginState.get('loading'),
        loginSuccess: LoginState.get('authenticated'),
        redirectPath: LoginState.get('redirect'),
        error: LoginState.get('error')
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (email, password) => {
        	dispatch(Actions.loginActions.login(email, password));
        },
        redirect: () => {
            if (ownProps.redirectPath) {
                dispatch(replace(redirectPath));
            } else {
                dispatch(replace("/profile"));      
            }
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
