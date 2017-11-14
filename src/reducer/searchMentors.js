import Immutable from 'immutable';
import Config from '../config';
import Storage from '../storage';


/////////////
/// TYPES ///
/////////////

const SEARCH_MAJOR_START = 'search_major_start';
const SEARCH_MAJOR_SUCCESS = 'search_major_success';
const SEARCH_MAJOR_ERROR = 'search_major_finish';


/////////////
// ACTIONS //
/////////////

const searchMajorsSuccess = (mentors) => {
    return {
        type: SEARCH_MAJOR_SUCCESS,
        mentors
    };
}

const handleSearch = (searchTerm) => {
    return dispatch => {
        console.log(searchTerm);
        dispatch({type: SEARCH_MAJOR_START, major: searchTerm});

        setTimeout(() => {
            dispatch(searchMajorsSuccess(['Wandi', 'Helen']));
        }, 1000);
    };
}


///////////
// STATE //
///////////

const defaultState = Immutable.fromJS({
    error: null,
    loading: false,
    searchedMajor: '',
    mentors: []  
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
                val.set('mentors', action.mentors);
            })
        }
        default: {
            return state;
        }
    }
}

export { SearchMentors, handleSearch }