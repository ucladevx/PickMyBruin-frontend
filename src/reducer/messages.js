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
        messages: []
    },
    threads: []  // all the threads that this user is part of
});

const Messages = (state = defaultState, action) => {
    switch(action.type) {
        // Add your action types here
        default: {
            return state;
        }
    }
}