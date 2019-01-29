import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware, push, routerActions} from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as notificationsReducer } from 'reapop';

import { Login, login, logout, loginAndRedirect, sendResetEmail, resetPassword } from './login';
import { Register, sendVerificationLink, confirmCode, completeRegistration } from './register';
import { Profile, fetchProfile, updateMentorStatus, updateUserProfile, updateMentorProfile, setProfilePic } from './profile';
import { SearchMentors, handleSearch } from './searchMentors'
import { Requests, getRequests, sendRequest } from './requests'
import { Messages, fetchThreads, fetchMessages, checkIfThreadExists, sendMessage, removeProfileViewing } from './messages';

const history = createHistory();
const reactRouterMiddleware = routerMiddleware(history);

let middleware = [reactRouterMiddleware, thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger({collapsed: true})];
}

// Install redux-devtools-extension to get a nice full view of what current state is
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        Register,
        Login,
        Profile,
        SearchMentors,
        Requests,
        Messages,
        router: routerReducer,
        notifications: notificationsReducer()
    }),
    composeEnhancers(applyMiddleware(
        ...middleware
    ))
);

const Actions = {
    registerActions: {
        sendVerificationLink, completeRegistration, confirmCode
    },
    loginActions: {
        login, logout, loginAndRedirect, sendResetEmail, resetPassword
    },
    profileActions: {
        fetchProfile, updateMentorStatus, updateUserProfile, updateMentorProfile, setProfilePic
    },
    searchMentorsActions: {
        handleSearch
    },
    requestsActions: {
        getRequests, sendRequest
    },
    messagesActions: {
        fetchThreads, fetchMessages, sendMessage, removeProfileViewing, checkIfThreadExists,
    }
}

export {
    store, history, Actions
}
