import Immutable, { List, fromJS } from 'immutable';
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

const searchMajorSuccess = data => {
    return {
        type: SEARCH_MAJOR_SUCCESS,
        data,
    };
}

const searchMajorFailure = (error) => {
    return {
        type: SEARCH_MAJOR_ERROR,
        error,
    };
}

const handleSearch = (searchTerm) => {
    return async dispatch => {
        dispatch({type: SEARCH_MAJOR_START, major: searchTerm});

        try {
            const token = Storage.get("token");

            const response = await fetch(Config.API_URL + `/mentors?major=${searchTerm}`, {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }),
            });

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error("Error fetching mentors");
            } else {
                dispatch(searchMajorSuccess(data));
            }
        } catch (e) {
            dispatch(searchMajorFailure(e));
        }
    };
}



///////////
// STATE //
///////////

const defaultState = Immutable.fromJS({
    error: null,
    searchedMajor: '',
    _internal: {
        searched: false,
    },
    mentors: [],
    count: null
});

const SearchMentors = (state=defaultState, action) => {
    switch(action.type) {
        case SEARCH_MAJOR_START: {
            return state.withMutations(val => {
                val.set('searchedMajor', action.major);
            })
        }
        case SEARCH_MAJOR_ERROR: {
            return state.withMutations(val => {
                val.set('error', action.error);
                val.setIn(['_internal', 'searched'], true);
            })
        }
        case SEARCH_MAJOR_SUCCESS: {
            return state.withMutations(val => {
                val.set('error', null);
                val.setIn(['_internal', 'searched'], true);
                val.set('count', action.data.count)
                
                /* 
                 * turn the results from the API into our preferred object format:
                 * { 
                 *      user: {}
                 *      mentor: {}
                 * }
                 *
                 */
                val.set('mentors', fromJS(action.data.results.map(mentor => {
                    let formattedMentor = {};
                    formattedMentor.user = mentor.profile;

                    delete mentor.profile;
                    formattedMentor.mentor = mentor;
                    return formattedMentor;
                })));
            })
        }
        default: {
            return state;
        }
    }
}

export { SearchMentors, handleSearch }
