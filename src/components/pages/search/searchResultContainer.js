import React from 'react';

class SearchResultContainer extends React.Component {
    render() {
        return (
            <div className="search-result-container">
                <h1>{this.props.mentor.get('name')}</h1>
                <h2>{this.props.mentor.get('major')}</h2>
                <p>{this.props.mentor.get('bio')}</p>
            </div>
        );
    }
}

export default SearchResultContainer;