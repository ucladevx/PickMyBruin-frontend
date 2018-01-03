import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Actions } from '../reducer';
import Login from '../components/pages/login';

class LoginContainer extends React.Component {

    componentDidUpdate(prevProps,prevState){
        if (this.props.loginSuccess && !this.props.error){
            this.props.redirectToProfile()
        };
    }

    render() {
        return(
            <Login
                sendUsernamePassword={this.props.sendUsernamePassword} // what is this for?
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
        error: LoginState.get('error')
    }
};

const mapDispatchToProps = dispatch => {
    return {
        sendUsernamePassword: (email, password) => {
        	dispatch(Actions.loginActions.sendUsernamePassword(email, password));
        },
        redirectToProfile: () => {
            dispatch(push("/profile"));      
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
