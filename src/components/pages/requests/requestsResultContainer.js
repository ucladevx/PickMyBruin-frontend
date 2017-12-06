import React from 'react';
import ProfilePic from '../profile/profilePicture';
import Shave from 'react-shave';

class RequestsResultContainer extends React.Component {

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
            <div className="request-result-container">
                <div className="profile-pic-container">
                    <ProfilePic />
                </div>
            	<div className="request-details">
            		<div className="wrapping">
		        		<div className="request-kind">{this.props.request.get('kind')}</div>
		            	<div className="request-date">{this.props.request.get('date')}</div>
		            </div>
	                <div className="request-name">{this.props.request.get('name')}</div>
	                <div className="request-message">
	                	<Shave maxHeight={maxHeight}>{this.props.request.get('message')}</Shave>
	                </div>
	            </div>
            </div>
        );
    }
}

export default RequestsResultContainer;


