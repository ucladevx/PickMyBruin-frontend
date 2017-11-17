import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Home from '../components/home';

class HomeContainer extends React.Component {
    render(){
        return(
            <Home 
                signUp={this.props.signUp}
            />
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signUp: () => {
            dispatch(push('/register'))
        }
    };
};


export default connect(null, mapDispatchToProps)(HomeContainer); 
