import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware, push} from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as notificationsReducer } from 'reapop';
import { Auth } from './auth';
import { Login, sendUsernamePassword } from './login';
import { Register, sendVerificationLink, confirmCode } from './register';
import { Profile, fetchProfile, updateProfile } from './profile';
import { SearchMentors, handleSearch } from './searchMentors';
import { Requests, handleRequests } from './requests'

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        Auth,
        Register,
        Login,
        Profile,
        SearchMentors,
        Requests,
        router: routerReducer,
        notifications: notificationsReducer()
    }),
    applyMiddleware(
        middleware, 
        thunk,
        createLogger({collapsed: true})
    )
);

const Actions = {
    registerActions: {
        sendVerificationLink
    },
    loginActions: {
        sendUsernamePassword, //use Actions.loginActions. in login container 
        sendVerificationLink, confirmCode
    },
    profileActions: {
        fetchProfile, updateProfile
    },
    searchMentorsActions: {
        handleSearch
    },
    requestsActions: {
        handleRequests
    }
}

export {
    store, history, Actions
}
