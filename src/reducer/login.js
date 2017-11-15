import Immutable from 'immutable';
import Config from '../config';
var formurlencoded = require('form-urlencoded');
import Storage from '../storage';
import {push} from "react-router-redux"

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

const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS
    }
}

// const sendUsernamePassword = (email, password) => {
//     return (dispatch) => {
//         console.log("in action creation")
//         dispatch(startLogin());  //start

//         // Just for testing //in between going to send things to backend 
//         // in between add a loader 
//         setTimeout(() => {
//             dispatch({type: LOGIN_SUCCESS}); //end
//         }, 1000);
//     }
// }

// 
const sendUsernamePassword = (email, password) => {
    return async (dispatch) => {
        try {
            const fullEmail = email;
            const fullPassword = password
            dispatch(startLogin());

            const response = await fetch(Config.API_URL + '/o/token/', {
                method: 'POST',
                headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded"
                }),
                body: formurlencoded({
                    username: fullEmail,
                    password: fullPassword,
                    grant_type: "password",
                    client_id: "web",
                    client_secret: Config.CLIENT_SECRET
                })
            });
            console.log('here');

            const status = await response.status;
            const data = await response.json();
            
            Storage.set("token", data.access_token)  
            dispatch(loginSuccess()) 

        //     if (status > 299 || status < 200) {
        //         throw new Error("Error login");
        //     } else {
        //         dispatch(registerEmailSuccess(data.user.email, data.id));
        //     }
        } catch (error) {
            console.log(error);

            // handle errors here
            // dispatch(notify({title: 'Error!', status: 'error', message: 'Try again or contact us', position: 'tc'}));
            // dispatch({type: SEND_VERIFICATION_LINK_FAILURE, message: error.message});
        }
    }
}
// 

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