import Immutable from 'immutable';

import Storage from 'storage';
import Config from 'config';

/////////////
// ACTIONS //
/////////////

const SEND_MESSAGE_START = 'send_message_start';
const SEND_MESSAGE_SUCCESS = 'send_message_success';
const SEND_MESSAGE_ERROR = 'send_message_error';

const FETCH_ALL_THREADS_START = 'fetch_all_threads_start';
const FETCH_ALL_THREADS_SUCCESS = 'fetch_all_threads_success';
const FETCH_ALL_THREADS_ERROR = 'fetch_all_threads_error';

const FETCH_ALL_MESSAGES_START = 'fetch_all_messages_start';
const FETCH_ALL_MESSAGES_SUCCESS = 'fetch_all_messages_success';
const FETCH_ALL_MESSAGES_ERROR = 'fetch_all_messages_error';

const defaultState = Immutable.fromJS({
    profileViewing: {  // the current user we are talking to in the thread view
        profileID: -1,  // ID of the user who we are currently talking to
        messages: [],
    },
    threads: [],  // all the threads that this user is part of
});

const Messages = (state = defaultState, action) => {
    switch(action.type) {
        // Add your action types here
        default: {
            return state;
        }
    }
}

const sendMessages = (message, mentorId) => {
    return async (dispatch, getState) => {
        try {
            const profile = getState().Profile

            dispatch({type: SEND_REQUEST_START});

            const response = await fetch(Config.API_URL + `/requests/${mentorId}/`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Storage.get("token")}`
                }),
                body: JSON.stringify({
                    phone: '', // FOR NOW
                    preferred_mentee_email: profile.getIn(['user', 'email']),
                    message
                })
            });

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error(data.error);
            } else {
                dispatch(notify({title: "Success!", status: 'success', message: "Your message is on the way", position: "tc"}));
                dispatch({type: SEND_REQUEST_SUCCESS, request: data});
            }
        }
        catch (err) {
            const message = "We couldn't send your request :( Try again or contact us";
            dispatch(notify({title: 'Error!', status: 'error', message, position: 'tc'}));
            dispatch({type: SEND_REQUEST_ERROR, error: err.message});
        }
    }
}

export { 
    Messages,
}