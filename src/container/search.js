import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../reducer';
import Search from '../components/pages/search';

class SearchContainer extends React.Component {
    
    render() {
        return (
            <Search 
                mentors={this.props.mentors}
                handleSearch={this.props.handleSearch(this.props.query)}
                count={this.props.count}
                _internal={this.props._internal}
                query={this.props.searchURL}
                
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
        query: state.searchURL
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handleSearch: (query) => {
            dispatch(Actions.searchMentorsActions.handleSearch(query));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
