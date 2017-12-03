import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../reducer';
import Search from '../components/pages/search';

class SearchContainer extends React.Component {
    render() {
        return (
            <Search 
                mentors={this.props.mentors}
                handleSearch={this.props.handleSearch}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        mentors: state.SearchMentors.get('mentors')
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handleSearch: major => {
            dispatch(Actions.searchMentorsActions.handleSearch(major));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);