import Immutable from 'immutable';
import formurlencoded from "form-urlencoded";
import {push} from "react-router-redux";
import { addNotification as notify } from 'reapop';
import Config from '../config';
import Storage from '../storage';

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

const loginFailure = () => {
    return {
        type: LOGIN_FAILURE
    }
}

const sendUsernamePassword = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch(startLogin());

            const response = await fetch(Config.API_URL + '/o/token/', {
                method: 'POST',
                headers: new Headers({
                "Content-Type": "application/x-www-form-urlencoded"
                }),
                body: formurlencoded({
                    username: email,
                    password: password,
                    grant_type: "password",
                    client_id: "web",
                    client_secret: Config.CLIENT_SECRET
                })
            });
            
            const status = await response.status;
            const data = await response.json();
            
            if (status > 299 || status < 200) {
                throw new Error("Error login");
            } else {
                Storage.set("token", data.access_token)
                dispatch(loginSuccess());
            }
        } catch (error) {
            // handle errors here
            dispatch(notify({title: 'Error!', status: 'error', message: 'There was an error logging in', position: 'tc'}));
            dispatch(loginFailure());
        }
    }
}

const defaultState = () => {
    const token = Storage.get('token');

    return Immutable.fromJS({
        loginSuccess: token,
        loading: false,
        error: null
    });
}

const Login = (state = defaultState(), action) => {
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
                val.set('error',null);
            })
        }
        case LOGIN_FAILURE: {
            return state.withMutations(val => {
                val.set('loginSuccess',false);
                val.set('loading', false);
                val.set('error', true);
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