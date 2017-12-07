import React from 'react';

import NavBar from '../../navbar';
import RequestsResultContainer from './requestsResultContainer';

class Requests extends React.Component {

    render() {
    	let k = 1;
        return(
            <div className="requests-container">                            
	            <div className="requests-results-container">
		            {this.props.requests.map(request => {
		            	k +=1;
		                return <RequestsResultContainer key={k} request={request} />
		            	} 
	                )}
	            </div>
	            <NavBar />
	        </div>
        );
    }
}

export default Requests;


