import React from 'react';
import {connect} from 'react-redux';
import { push, replace } from 'react-router-redux';

import { Actions } from '../reducer';
import Home from '../components/pages/home';

class HomeContainer extends React.Component {
    componentDidMount() {
        if (this.props.loggedIn) {
            this.props.redirectToProfile();
            this.props.fetchProfile();
        }
    }

    render() {
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
        loggedIn: !!Login.get('authenticated')
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        signUp: () => {
            dispatch(push('/register'));
        },
        redirectToProfile: () => {
            dispatch(replace('/profile'));
        },
        fetchProfile: () => {
            dispatch(Actions.profileActions.fetchProfile());
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer); 
