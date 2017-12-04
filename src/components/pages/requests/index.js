import React from 'react';

import NavBar from '../../navbar';
import RequestsResultContainer from './requestsResultContainer';

class Requests extends React.Component {
    render() {
        return(
            <div className="requests-container">
                <NavBar />
            
	            <div className="requests-results-container">
		            {this.props.requests.map(request => 
		                <RequestsResultContainer request={request} />
	                    )}
	            </div>
	        </div>
        );
    }
}

export default Requests;