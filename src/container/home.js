import React from 'react';
import {connect} from 'react-redux';
import { push, replace } from 'react-router-redux';

import Home from '../components/pages/home';

class HomeContainer extends React.Component {
    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.redirectToProfile();
        }
    }

    render(){
        return(
            <Home 
                signUp={this.props.signUp}
            />
        );
    }
}

const mapStateToProps = state => {
    const Login = state.Login;
    return {
        loggedIn: !!Login.get('loginSuccess')
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signUp: () => {
            dispatch(push('/register'));
        },
        redirectToProfile: () => {
            dispatch(replace('/profile'));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer); 
