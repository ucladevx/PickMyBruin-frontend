import React from 'react';
import Footer from '../../../components/footer';
import Form from '../../util/ResetPasswordForm';
import Logo from '../../util/Logo';

class ResetPassword extends React.Component {
    render() {
        return (
            <div className="container-login">
                <Logo color="white" LoggedIn={false} />
                <div className="container-password-reset">
                    <h1 className="password-reset-title">Password Reset</h1>
                    <Form action={this.props.resetPassword} buttonText="Reset"/>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ResetPassword;
