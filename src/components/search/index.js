import React from 'react';

import NavBar from '../navbar';
import SearchBar from '../searchBar';

class Search extends React.Component {
    render() {
        return(
            <div className="search-container">
                <SearchBar />
                <NavBar />
            </div>
        );
    }
}

export default Search;