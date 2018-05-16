import React from 'react';
import Sidebar from 'components/pages/ambassadorDetail/sidebar';

import { connect } from 'react-redux';

class SidebarContainer extends React.Component {
    render() {
        return (
            <Sidebar 
                count={this.props.count}
                mentors={this.props.mentors}
                searchedMajor={this.props.searchedMajor}
            />
        )
    }
}

const mapStateToProps = state => {
    const Search = state.SearchMentors;
    return {
        count: Search.get('count'),
        mentors: Search.get('mentors'),
        searchedMajor: Search.get('searchedMajor'),
    }
}

export default connect(mapStateToProps)(SidebarContainer);