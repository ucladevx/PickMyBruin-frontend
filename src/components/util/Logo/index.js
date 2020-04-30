import React from 'react';
import { push } from 'react-router-redux';
import whiteBquest from '../../../../images/loginPage/white-bquest.svg.inline';
import whiteBquestLogo from '../../../../images/loginPage/white-bquest-logo.svg.inline';
import tealBquestLogo from '../../../../images/loginPage/teal-bquest-logo.svg.inline';
import tealBquest from '../../../../images/loginPage/teal-bquest.svg.inline';

class Logo extends React.Component {
	render() {
	    return (
	    	<div>
		    	{(this.props.color === "teal") && 
		    	<div className="logo" onClick={() => location.href=(this.props.LoggedIn ? "/home" : "/")} style={{cursor:'pointer'}}>
		            <div className="logo-logo" dangerouslySetInnerHTML={{__html: tealBquestLogo}} />
		            <div className="logo-text" dangerouslySetInnerHTML={{__html: tealBquest}} />
		        </div>
		    	}
		        {(this.props.color === "white") && 
		        <div className="logo" onClick={() => location.href=(this.props.LoggedIn ? "/home" : "/")} style={{cursor:'pointer'}}>
		            <div className="logo-logo" dangerouslySetInnerHTML={{__html: whiteBquestLogo}} />
		            <div className="logo-text" dangerouslySetInnerHTML={{__html: whiteBquest}} />
		        </div>
		    	}
		    	{(this.props.color === "small-white") &&
		    	<div className="logo" onClick={() => location.href=(this.props.LoggedIn ? "/home" : "/")} style={{cursor:'pointer'}}>
		            <div className="logo-logo" dangerouslySetInnerHTML={{__html: whiteBquestLogo}} />
		        </div>
		    	}
			</div>
	    );
	}
}

export default Logo;