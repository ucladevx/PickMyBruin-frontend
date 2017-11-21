import React from 'react';

import NavBar from '../../navbar';
import SearchBar from '../../searchBar';

import SearchResultContainer from './searchResultContainer';

class Search extends React.Component {
    render() {
        return(
            <div className="search-container">
                <div className="search">
                    <SearchBar 
                        handleSearch={this.props.handleSearch}
                    />
                </div>
                <div className="search-results-container">
                    {this.props.mentors.map(mentor => 
                        <SearchResultContainer mentor={mentor} />
                    )}
                </div>
                <NavBar />
            </div>
        );
    }
}

export default Search;