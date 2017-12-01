import React from 'react';
import Shave from 'react-shave';

class SearchResultContainer extends React.Component {
    render() {
        return (
            <div className="search-result-container">
                <div className="mentor-details">
                    <div className="mentor-name">{this.props.mentor.get('name')}</div>
                    <div className="mentor-major">{this.props.mentor.get('major')}</div>
                    <div className="mentor-bio">
                        <Shave maxHeight={100}>{this.props.mentor.get('bio')}</Shave>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchResultContainer;