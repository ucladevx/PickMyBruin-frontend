import React from 'react'
import Footer from '../../footer';
import NavBar from '../../navbar';
import TopBar from '../home/topBar';
import { connect } from 'react-redux';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="about-container">
                <div className="bar-container">
                    {this.props.isLoggedIn ? <NavBar /> : <TopBar />}
                    {!this.props.isLoggedIn && <div className="topbar-spaceholder" />}
                </div>
                <div className="about-title">
                    <p>ABOUT US</p>
                </div>
                <div className="about-content">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum.
                    </p>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum.
                    </p>
                    <br />
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore 
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum.
                    </p>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const Login = state.Login;

    return {
        isLoggedIn: Login.get('authenticated'),
    }
}

export default connect(mapStateToProps)(AboutUs);
