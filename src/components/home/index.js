import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import { Button } from 'reactstrap';

import Config from 'config';


class Home extends React.Component {
    render(){
        return(
            <div className="container home">
                <h1>One-sentence catchline to onboard new users.</h1>
                <div className="info">
                    <Button color="primary" onClick={this.props.signUp} block>Sign Up</Button>
                    <p>Already have an account?</p>
                    <p>Log in here</p>
                </div>
            </div>
        )    
    }
}

const mapStateToProps = (state)=>{
    return {
        urlPath: state.router.location.pathname,
    };
};

const mapDispatchToProps = (dispatch)=>{
    return {
        signUp: () => {
            dispatch(push('/register'))
        }
    };
};


Home = connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home
