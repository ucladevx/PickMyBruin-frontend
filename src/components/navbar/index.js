import React from 'react';
import classNames from 'classnames';


class NavBar extends React.Component {

    state = {
        selectedIndex: 0
    }

    navigate = idx => {
        this.setState({selectedIndex: idx});
        console.log(idx);
    }

    render() {
        const { selectedIndex } = this.state;
        return(
            <div className="navbar-container">
                <div className={classNames("navigation-item", {selected: selectedIndex == 0})} onClick={() => this.navigate(0)}>
                    <i className="fa fa-search fa-lg" aria-hidden="true"></i>
                    <p>Search</p>
                </div>
                <div className={classNames("navigation-item", {selected: selectedIndex == 1})} onClick={() => this.navigate(1)}>
                    <i className="fa fa-user-circle-o fa-lg" aria-hidden="true"></i>
                    <p>My Profile</p>
                </div>
                <div className={classNames("navigation-item", {selected: selectedIndex == 2})} onClick={() => this.navigate(2)}>
                    <i className="fa fa-comment-o" aria-hidden="true"></i>
                    <p>Requests</p>
                </div>
            </div>
        );
    }
}

export default NavBar;

