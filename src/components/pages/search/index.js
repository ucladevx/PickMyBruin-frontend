import React from 'react';

import NavBar from 'components/navbar';
import SearchBar from './searchBar';
import Footer from '../../footer';

import SearchResultContainer from './searchResultContainer';
import Results from './results';

class Search extends React.Component {

    

    
    // getQuery(event) {
    //     return search_query;
        
    // }

    // handleSearch(e) {
    //     this.setState({search_query: e.target.value})
    // }

    
    render() {
        return(
            <div className="search-container">
                <NavBar />
                <div className="search">
                    <SearchBar
                        
                        handleSearch={this.props.handleSearch}
                        
                        // const isSelected = this.state.platform ? true : false;     
                    />
                </div>

                   
                <Results
                    mentors={this.props.mentors}
                    count={this.props.count}
                    _internal={this.props._internal} 
                />
                <div className="results-footer">
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Search;
