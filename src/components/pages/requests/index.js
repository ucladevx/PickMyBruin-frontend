import React from 'react';

import NavBar from '../../navbar';
import RequestsResultContainer from './requestsResultContainer';

class Requests extends React.Component {
    render() {
        return(
            <div className="requests-container">                            
	            <div className="requests-results-container">
		            {this.props.requests.map(request => 
		                <RequestsResultContainer request={request} />
	                    )}
	            </div>
	            <NavBar />
	        </div>
        );
    }
}

export default Requests;


