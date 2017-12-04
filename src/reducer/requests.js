import Immutable, { List } from 'immutable';
import formurlencoded from "form-urlencoded";
import {push} from "react-router-redux";
import { addNotification as notify } from 'reapop';
import Config from '../config';
import Storage from '../storage';

/////////////
/// TYPES ///
/////////////

const REQUESTS_START = 'requests_start';
const REQUESTS_SUCCESS = 'requests_success';


/////////////
// ACTIONS //
/////////////

const dummyRequests = Immutable.fromJS([
    {
        name: "Mary Smith",
        major: "Linguistics and Computer Science",
        year: 4,
        bio: "I love Linguistics and Computer Science because it gave me the blah blah blah"
    },
    {
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        bio: "Coming to UCLA as an undeclared student, I knew that I wanted an interdisciplinary education that taught \
              me"

    },
    {
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        bio: "Coming to UCLA as an undeclared student, I knew that I wanted an interdisciplinary education that taught \
              me"

    },
    {
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        bio: "Coming to UCLA as an undeclared student, I knew that I wanted an interdisciplinary education that taught \
              me"

    },
    {
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        bio: "Coming to UCLA as an undeclared student, I knew that I wanted an interdisciplinary education that taught \
              me"

    },
])

const requestsStart = () => {
    return {
        type: REQUESTS_START
    }
}

const requestsSuccess = (requests) => {
    return {
        type: REQUESTS_SUCCESS,
        requests
    };
}

const handleRequests = () => {
	return dispatch => {
		dispatch(requestsStart())
		
		setTimeout(() => {
			dispatch(requestsSuccess(dummyRequests));
		},1);
	};
}

///////////
// STATE //
///////////

const defaultState = Immutable.fromJS({
    error: null,
    loading: false,
    requests: dummyRequests
});

const Requests = (state=defaultState, action) => {
    switch(action.type) {
        case REQUESTS_START: {
            return state.withMutations(val => {
                val.set('loading', true);
            })
        }
        case REQUESTS_SUCCESS: {
            return state.withMutations(val => {
                val.set('loading', false);
                val.setIn(['requests'], action.requests);
            })
        }
        default: {
            return state;
        }
    }
}


export { handleRequests, Requests }