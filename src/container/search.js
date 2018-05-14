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
                count={this.props.count}
                _internal={this.props._internal}
            />
        );
    }
}

const mapStateToProps = state => {
    const SearchMentors = state.SearchMentors;
    return {
        mentors: SearchMentors.get('mentors'),
        count: SearchMentors.get('count'),
        _internal: SearchMentors.get('_internal'),
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
