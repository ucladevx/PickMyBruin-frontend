import React from 'react';
import SearchResultContainer from './searchResultContainer';

export default (props) => {
    if (!props.mentors) {
        return null;
    }
    
    if (props._internal && props._internal.get('searched') && props.mentors.size === 0) {
        return (
            <div className="instructions">
                <h1>We don't have ambassadors in that major at the moment. Check back soon!</h1>
            </div>
        );
    }

    if (props.mentors.size !== 0) {
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
    } else if (props._internal && !props._internal.get('searched')) {
        return(
            <div className="instructions">
                <h1>&#x1F446; Try typing in the search bar above to find ambassadors in majors you're interested in</h1>
            </div>
        ); 
    } else {
        return null;
    }
};
