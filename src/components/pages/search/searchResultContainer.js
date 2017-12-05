import React from 'react';
import Shave from 'react-shave';
import { Link } from 'react-router-dom';

import ProfilePic from '../profile/profilePicture';
import { join } from 'path';

class SearchResultContainer extends React.Component {
    state = {
        maxHeight: 100
    }

    commponentDidMount() {
        if (window.innerWidth <= 320) {
            this.resetMaxHeight(70);
        }
    }

    resetMaxHeight = (maxHeight) => {
        this.setState((prevState, props) => {
            return {maxHeight};
        })
    }

    render() {
        const {
            maxHeight
        } = this.state;

        return (
            <Link to={`/mentors/${this.props.mentor.get('id')}`}>
            <div className="search-result-container">
                <div className="profile-pic-container">
                    <ProfilePic />
                </div>
                <div className="mentor-details">
                    <div className="mentor-name">{this.props.mentor.get('name')}</div>
                    <div className="mentor-major">{this.props.mentor.get('major')}</div>
                    <div className="mentor-bio">
                        <Shave maxHeight={maxHeight}>{this.props.mentor.get('bio')}</Shave>
                    </div>
                </div>
            </div>
            </Link>
        );
    }
}

export default SearchResultContainer;