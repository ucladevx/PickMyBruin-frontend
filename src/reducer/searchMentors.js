import Immutable, { List } from 'immutable';
import Config from '../config';
import Storage from '../storage';


/////////////
/// TYPES ///
/////////////

const SEARCH_MAJOR_START = 'search_major_start';
const SEARCH_MAJOR_SUCCESS = 'search_major_success';
const SEARCH_MAJOR_ERROR = 'search_major_error';


/////////////
// ACTIONS //
/////////////

const dummyMentors = Immutable.fromJS([
    {
        id: 1,
        name: "Mary Smith",
        major: "Linguistics ",
        year: 4,
        bio: "I love Linguistics and Computer Science because it gave me the blah blah blah"
    },
    {
        id: 2,
        name: "Mark Song",
        major: "Linguistics and Computer Science and Linguistics and super long",
        year: 2,
        bio: "Coming to UCLA as an undeclared student, I knew that I wanted an interdisciplinary education that taught \
              me how to be the best person that i can and I absolutely love it here i want to marry jean block he is the greates \
              human being alive!!"

    },
    {
        id: 3,
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        bio: "Coming to UCLA as an undeclared student, I knew that I wanted an interdisciplinary education that taught \
              me"

    },
    {
        id: 4,
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        bio: "Coming to UCLA as an undeclared student, I knew that I wanted an interdisciplinary education that taught \
              me"

    },
    {
        id: 5,
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        bio: "Coming to UCLA as an undeclared student, I knew that I wanted an interdisciplinary education that taught \
              me"

    },
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