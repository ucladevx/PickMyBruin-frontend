import React from 'react';
import Logo from '../../util/Logo';
import Footer from '../../../components/footer';

class ForgetPasswordPending extends React.Component {
    render() {
        return (
            <div className="container-login">
                <Logo color="white" LoggedIn={false} />
                <div className="container-pending">
                    <h1 className="loginform-title">Email Sent! Check your email :)</h1>
                </div>
                <Footer />
            </div>
        );
    }
}

export default ForgetPasswordPending;
