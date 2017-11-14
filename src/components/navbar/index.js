import React from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

const searchIcon = <FontIcon className="material-icons">search</FontIcon>;
const profileIcon = <FontIcon className="material-icons">face</FontIcon>;


class NavBar extends React.Component {

    state = {
        selectedIndex: 0
    }

    navigate = idx => {
        this.setState({selectedIndex: idx});
        console.log(idx);
    }

    render() {
        return(
            <div className="navbar-container">
                <div className="navigation-item search">
                    <i className="fa fa-search fa-lg" aria-hidden="true"></i>
                    <p>Search</p>
                </div>
                <div className="navigation-item profile">
                    <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                    <p>My Profile</p>
                </div>
                <div className="navigation-item requests">
                    <i className="fa fa-comment-o" aria-hidden="true"></i>
                    <p>Requests</p>
                </div>
            </div>
        );
    }
}

export default NavBar;

