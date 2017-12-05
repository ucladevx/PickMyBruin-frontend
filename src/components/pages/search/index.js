import React from 'react';

import NavBar from '../../navbar';
import SearchBar from '../../searchBar';

import SearchResultContainer from './searchResultContainer';
import Results from './results';

class Search extends React.Component {
    render() {
        return(
            <div className="search-container">
                <div className="search">
                    <SearchBar 
                        handleSearch={this.props.handleSearch}
                    />
                </div>
                <Results mentors={this.props.mentors}/>
                <NavBar />
            </div>
        );
    }
}

export default Search;