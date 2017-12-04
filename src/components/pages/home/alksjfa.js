import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    render(){
        return(
            <div className="container home">
                <h1>One-sentence catchline to onboard new users.</h1> 
                <div className="info">
                </div>
            </div>
        )    
    }
}

export default Home
