import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware, push, routerActions} from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as notificationsReducer } from 'reapop';

import { Login, login, logout, loginAndRedirect } from './login';
import { Register, sendVerificationLink, confirmCode, completeRegistration } from './register';
import { Profile, fetchProfile, updateMentorStatus, updateUserProfile, updateMentorProfile, setProfilePic } from './profile';
import { SearchMentors, handleSearch } from './searchMentors'
import { Requests, getRequests, sendRequest } from './requests'
import { Messages, fetchThreads, fetchMessagesIfThreadExists, setProfileViewing, sendMessage } from './messages';

const history = createHistory();
const reactRouterMiddleware = routerMiddleware(history);

let middleware = [reactRouterMiddleware, thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, createLogger({collapsed: true})];
}

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
    applyMiddleware(
        ...middleware
    )
);

const Actions = {
    registerActions: {
        sendVerificationLink, completeRegistration, confirmCode
    },
    loginActions: {
        login, logout, loginAndRedirect
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
        fetchThreads, setProfileViewing, fetchMessagesIfThreadExists, sendMessage,
    }
}

export {
    store, history, Actions
}
