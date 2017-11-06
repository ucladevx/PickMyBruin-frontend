import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware, push} from 'react-router-redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { Auth } from './auth';
import { Register, sendVerificationLink, confirmCode } from './register';

// import reducers from './reducers';


const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        Auth,
        Register,
        router: routerReducer,
    }),
    applyMiddleware(
        middleware, 
        thunk,
        createLogger({collapsed: true})
    )
);

const Actions = {
    registerActions: {
        sendVerificationLink, confirmCode
    }
}

export {
    store, history, Actions
}
