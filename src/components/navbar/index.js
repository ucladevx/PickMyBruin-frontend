import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import logo from '../../../images/landingPage/logo.png';
console.log(logo);
import SearchBar from '../searchBar';


class NavBar extends React.Component {

    navigate = location => {
        if (location != this.props.location) {
            this.props.goTo(location);
        }
    }

    render() {
        const { location } = this.props
        return(
            <div className="navbar-container">
                <div className="logo">
                    <img src={logo} id="logo" alt="logo" /> 
                </div>
                <div className="buttons">
                    <div className={classNames("navigation-item", {selected: location.startsWith("search")})} onClick={() => this.navigate("search")}>
                        <i className="fa fa-search fa-lg" aria-hidden="true"></i>
                        <p>Search</p>
                    </div>
                    <div className={classNames("navigation-item", {selected: location.startsWith("profile")})} onClick={() => this.navigate("profile")}>
                        <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                        <p>My Profile</p>
                    </div>
                    <div className={classNames("navigation-item", {selected: location.startsWith("messages")})} onClick={() => this.navigate("messages")}>
                        <i className="fa fa-comment-o" aria-hidden="true"></i>
                        <p>Messages</p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        location: state.router.location.pathname.substr(1)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        goTo: (location) => {
            dispatch(push("/" + location));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

