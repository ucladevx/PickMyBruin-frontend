import React from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';


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
                <div className={classNames("navigation-item", {selected: location == "search"})} onClick={() => this.navigate("search")}>
                    <i className="fa fa-search fa-lg" aria-hidden="true"></i>
                    <p>Search</p>
                </div>
                <div className={classNames("navigation-item", {selected: location == "profile"})} onClick={() => this.navigate("profile")}>
                    <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                    <p>My Profile</p>
                </div>
                <div className={classNames("navigation-item", {selected: location == "requests"})} onClick={() => this.navigate("requests")}>
                    <i className="fa fa-comment-o" aria-hidden="true"></i>
                    <p>Requests</p>
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

