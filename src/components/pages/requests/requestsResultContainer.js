import React from 'react';

class RequestsResultContainer extends React.Component {
    render() {
        return (
            <div className="request-result-container">
                <h1>{this.props.request.get('name')}</h1>
                <h2>{this.props.request.get('major')}</h2>
                <p>{this.props.request.get('bio')}</p>
            </div>
        );
    }
}

export default RequestsResultContainer;