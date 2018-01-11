import React from 'react';
import SearchResultContainer from './searchResultContainer';

export default (props) => {
    if (props.mentors) {
        return (
            <div className="search-results-container">
                {props.mentors.map(mentorProfile => 
                    <SearchResultContainer 
                        key={mentorProfile.getIn(['mentor', 'id'])} 
                        mentorProfile={mentorProfile} 
                    />
                )}
            </div>
        );
    } else {
        return null;
    }
};
