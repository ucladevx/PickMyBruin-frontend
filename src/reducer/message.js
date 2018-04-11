import Immutable, { fromJS } from 'immutable';

import Storage from 'storage';
import Config from 'config';
import { logout } from './login';

/////////////
// ACTIONS //
/////////////

const SEND_MESSAGE_START = 'send_message_start';
const SEND_MESSAGE_SUCCESS = 'send_message_success';
const SEND_MESSAGE_ERROR = 'send_message_error';

const FETCH_MESSAGE_START = 'fetch_message_start';
const FETCH_MESSAGE_SUCCESS = 'fetch_message_success';
const FETCH_MESSAGE_ERROR = 'fetch_message_error';

const fetchThread = () => {
    return async dispatch => {
        const token = Storage.get('token');

        try {
            const response = await fetch(`${Config.API_URL}/messaging/3/`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                })
            });

            const status = await response.status;
            const data = await response.json();

            if (status >= 400) {
                return dispatch({
                    type: FETCH_MESSAGE_ERROR,
                    message: "Could not fetch your messages at this time"
                });
            }
            dispatch({
                type:FETCH_MESSAGE_SUCCESS,
                data,
            });
        } catch (err) {
            dispatch({
                type: FETCH_MESSAGE_ERROR,
                error: err.message
            });
        }
    }
}

const defaultState = Immutable.fromJS({
    profileViewing: {  // the current user we are talking to in the thread view
        profileID: -1,  // ID of the user who we are currently talking to
        messages: [],
    },
    thread: [{'body':'', 'sender':{'id':-5}}],  // all the threads that this user is part of

    count: 0,
    error: null,
});


const Message = (state = defaultState, action) => {
    switch(action.type) {
        // Add your action types here
        case FETCH_MESSAGE_SUCCESS: {
            return state.withMutations(val => {
                val.set('count', action.data.count);
                val.set('thread', fromJS(action.data.results));
            });
        }
        default: {
            return state;
        }
    }
}

export {
	Message,
	fetchThread
}
