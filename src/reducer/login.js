import Immutable from 'immutable';

// create function that sends username and password

const START_LOGIN = 'start_login';
const LOGIN_SUCCESS = 'login_success';
const LOGIN_FAILURE = 'login_failure';

// action!!
const startLogin = () => {
    return {
        type: START_LOGIN
    }
}

const sendUsernamePassword = (email, password) => {
    return (dispatch) => {
        console.log("in action creation")
        dispatch(startLogin());  //start

        // Just for testing //in between going to send things to backend 
        // in between add a loader 
        setTimeout(() => {
            dispatch({type: LOGIN_SUCCESS}); //end
        }, 1000);
    }
}

const defaultState = Immutable.fromJS({
    loginSuccess: false,
    loading: false,
    error: null
});

const Login = (state = defaultState, action) => {
    switch (action.type) {
        case START_LOGIN: {
            return state.withMutations(val => {
                val.set('loading', true);
            });
        }
        case LOGIN_SUCCESS: {
            return state.withMutations(val => {
                val.set('loginSuccess', true);
                val.set('loading', false);
                val.set('error',null)
            })
        }
        default: {
            return state;
        }
    }
}

export {
    Login, sendUsernamePassword
};