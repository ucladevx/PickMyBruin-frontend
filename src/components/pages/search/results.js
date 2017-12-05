import React from 'react';
import SearchResultContainer from './searchResultContainer';

export default (props) => {
    return (
        <div className="search-results-container">
            {props.mentors ? props.mentors.map(mentor => 
                <SearchResultContainer 
                    key={mentor.get('id')} 
                    mentor={mentor} 
                />
            ) : null}
        </div>
    );
};