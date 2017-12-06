import React from 'react';
import SearchResultContainer from './searchResultContainer';

export default (props) => {
    return (
        <div className="search-results-container">
            {props.mentors ? props.mentors.map(mentorProfile => 
                <SearchResultContainer 
                    key={mentorProfile.getIn(['mentor', 'id'])} 
                    mentorProfile={mentorProfile} 
                />
            ) : null}
        </div>
    );
};