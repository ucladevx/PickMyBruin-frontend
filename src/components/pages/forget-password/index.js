import React from 'react';
import Footer from '../../../components/footer';
import Logo from '../../util/Logo';
import Form from '../../util/ForgetPasswordForm';

class ForgetPassword extends React.Component {
    render() {
        return (
            <div className="container-login">
                <Logo color="white" LoggedIn={false} />
                <div className="container-password-reset">
                    <h1 className="password-reset-title">Password Reset</h1>
                    <p>We'll send a password reset link to your email.</p>
                    <Form action={this.props.sendResetEmail} buttonText="Send Email"/>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ForgetPassword;
