import {createStore, combineReducers, applyMiddleware} from 'redux';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware, push} from 'react-router-redux';
import thunk from 'redux-thunk';

import { Auth } from './auth';
import { Register, sendVerificationLink } from './register';

// import reducers from './reducers';


const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers({
        Auth,
        Register,
        router: routerReducer,
    }),
    applyMiddleware(middleware, thunk)
);

const Actions = {
    registerActions: {
        sendVerificationLink
    }
}

export {
    store, history, Actions
}
