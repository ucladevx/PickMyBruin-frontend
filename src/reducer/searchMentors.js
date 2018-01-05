import Immutable, { List } from 'immutable';
import { addNotification as notify } from 'reapop';

import Config from '../config';
import Storage from '../storage';


/////////////
/// TYPES ///
/////////////

const SEARCH_MAJOR_START = 'search_major_start';
const SEARCH_MAJOR_SUCCESS = 'search_major_success';
const SEARCH_MAJOR_ERROR = 'search_major_error';

const SEND_REQUEST_START = 'send_request_start';
const SEND_REQUEST_SUCCESS = 'send_request_success';
const SEND_REQUEST_ERROR = 'send_request_error';


/////////////
// ACTIONS //
/////////////

const dummyMentors = Immutable.fromJS([
    {
        user: { 
            id: 1,
            first_name: 'Mary',
            last_name: 'Smith',
            email: 'mary@smith.cmo',
            year: '2nd',
            verified: true,
        },
        mentor: {
            id: 1,
            active: true,
            major: "Computer Science",
            bio: "I LOVE MY MAJOR SO MUCH! It's the best thing in the world and I have learned so much \
                and I can't wat to share that info with others come talk to me!! \
                I LOVE MY MAJOR SO MUCH! It's the best thing in the world and I have learned so much \
                and I can't wat to share that info with others come talk to me!!",
            gpa: "0.00",
            clubs: null,
            classes: ['cs111', 'cs31', 'cs32', 'cs333']
        }
    },
    {
        user: { 
            id: 2,
            first_name: 'Mark',
            last_name: 'Tai',
            email: 'mark@smith.cmo',
            year: '2nd',
            verified: true,
        },
        mentor: {
            id: 2,
            active: true,
            major: "Computer Science",
            bio: "I LOVE MY MAJOR SO MUCH! It's the best thing in the world and I have learned so much \
                and I can't wat to share that info with others come talk to me!!",
            gpa: "0.00",
            clubs: null,
            classes: ['cs111', 'cs31', 'cs32', 'cs333', 'cs111']
        }
    }
])

const searchMajorsSuccess = (mentors) => {
    return {
        type: SEARCH_MAJOR_SUCCESS,
        mentors
    };
}

const handleSearch = (searchTerm) => {
    return dispatch => {
        dispatch({type: SEARCH_MAJOR_START, major: searchTerm});

        setTimeout(() => {
            dispatch(searchMajorsSuccess(dummyMentors));
        }, 1);
    };
}



///////////
// STATE //
///////////

const defaultState = Immutable.fromJS({
    error: null,
    loading: false,
    searchedMajor: '',
    mentors: dummyMentors
});

const SearchMentors = (state=defaultState, action) => {
    switch(action.type) {
        case SEARCH_MAJOR_START: {
            return state.withMutations(val => {
                val.set('loading', true);
                val.set('searchedMajor', action.major);
            })
        }
        case SEARCH_MAJOR_ERROR: {
            return state.withMutations(val => {
                val.set('loading', false);
                val.set('error', action.error);
            })
        }
        case SEARCH_MAJOR_SUCCESS: {
            return state.withMutations(val => {
                val.set('loading', false);
                val.set('error', null);
                val.setIn(['mentors'], action.mentors);
            })
        }
        default: {
            return state;
        }
    }
}

export { SearchMentors, handleSearch }
