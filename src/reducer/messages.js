import Immutable, { fromJS } from 'immutable';
import { addNotification as notify } from 'reapop';

import Storage from 'storage';
import Config from 'config';
import { logout } from './login';

/////////////
// ACTIONS //
/////////////

const SEND_MESSAGE_SUCCESS = 'send_message_success';
const SEND_MESSAGE_ERROR = 'send_message_error';

const FETCH_ALL_THREADS_START = 'fetch_all_threads_start';
const FETCH_ALL_THREADS_SUCCESS = 'fetch_all_threads_success';
const FETCH_ALL_THREADS_ERROR = 'fetch_all_threads_error';
const SET_THREAD_VIEWING = 'change_thread_viewing';

const FETCH_ALL_MESSAGES_START = 'fetch_all_messages_start';
const FETCH_ALL_MESSAGES_SUCCESS = 'fetch_all_messages_success';
const FETCH_ALL_MESSAGES_ERROR = 'fetch_all_messages_error';

const setProfileViewing = id => {
    return {
        type: CHANGE_THREAD_VIEWING,
        id
    }
}

const sendMessageSuccess = (messages) => {
    return {
        type: SEND_MESSAGE_SUCCESS,
        messages
    }
}

const sendMessage = (message) => {
    return async (dispatch, getState) => {
        try {
            const profileID = getState().Messages.getIn(['profileViewing','profileID']);

            const response = await fetch(Config.API_URL + `/messaging/${profileID}/`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Storage.get("token")}`
                }),
                body: JSON.stringify({
                    body: message
                })
            });

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error();
            } else {
                dispatch(sendMessageSuccess(data));
            }
        }
        catch (err) {
            const message = "We couldn't send your message :( Try again later";
            dispatch(notify({title: 'Error!', status: 'error', message, position: 'tc'}));
            dispatch({type: SEND_MESSAGE_ERROR});
        }
    }
}

const fetchThreads = () => {
    return async dispatch => {
        
        const token = Storage.get('token');

        try {
            const response = await fetch(`${Config.API_URL}/messaging/me/`, {
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
                    type: FETCH_ALL_THREADS_ERROR,
                    message: "Could not fetch your messages at this time"
                });
            }

            dispatch({
                type:FETCH_ALL_THREADS_SUCCESS,
                data,
            });            
        } catch (err) {
            dispatch({
                type: FETCH_ALL_THREADS_ERROR,
                error: err.message
            });
        }
    }
}


///////////
// STATE //
///////////

const defaultState = Immutable.fromJS({
    profileViewing: {  // the current user we are talking to in the thread view
        profileID: 1,  // ID of the user who we are currently talking to
        messages: [],
    },
    threads: [],  // all the threads that this user is part of

    count: null,
    error: null,
});

const Messages = (state = defaultState, action) => {
    switch(action.type) {
        // Add your action types here
        case SEND_MESSAGE_SUCCESS: {
            return state.withMutations(val => {
                const messages = val.getIn(['profileViewing', 'messages']);
                const newMessages = messages.push(fromJS(action.message));
                val.setIn(['profileViewing', 'messages'], newMessages);
            })
        }
        case FETCH_ALL_MESSAGES_START: {
            return state.withMutations(val => {

            })
        }
        case FETCH_ALL_MESSAGES_SUCCESS: {
            return state.withMutations(val => {

            })
        }
        case FETCH_ALL_MESSAGES_ERROR: {
            return state.withMutations(val => {

            })
        }
        case FETCH_ALL_THREADS_START: {
            return state.withMutations(val => {

            })
        }
        case FETCH_ALL_THREADS_SUCCESS: {
            return state.withMutations(val => {
                val.set('count', action.data.count);
                val.set('threads', fromJS(action.data.results));
            })
        }
        case FETCH_ALL_THREADS_ERROR: {
            return state.withMutation(val => {

            })
        }
        case SET_THREAD_VIEWING: {
            return state.withMutations(val => {
                val.setIn(['profileViewing', 'profileID'], action.id);
            })
        }
        default: {
            return state;
        }
    }
}

export { 
    Messages,
    fetchThreads,
    setProfileViewing,
    sendMessage
}