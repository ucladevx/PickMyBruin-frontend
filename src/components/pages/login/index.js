import React from 'react';
import Form from 'components/util/LoginRegisterForm';
import Logo from '../../util/Logo';
import Footer from '../../../components/footer';

class Login extends React.Component {

    render() {
        return(
            <div className="container-login">
                <Logo color="white" LoggedIn={false} />
                <div className="container-loginform">
                    <h1 className="loginform-title">Login</h1>
                    <Form action={this.props.login} buttonText="Log In"/>
                </div>
                <Footer />
            </div>
        )
    }
};


export default Login;
