import Immutable, { List } from 'immutable';
import formurlencoded from "form-urlencoded";
import {push} from "react-router-redux";
import { addNotification as notify } from 'reapop';
import Config from '../config';
import Storage from '../storage';

/////////////
/// TYPES ///
/////////////

const START_GETTING_REQUESTS = 'start_getting_requests';
const FINISH_GETTING_REQUESTS = 'finish_getting_requests';

const SEND_REQUEST_START = 'send_request_start';
const SEND_REQUEST_SUCCESS = 'send_request_success';
const SEND_REQUEST_ERROR = 'send_request_error';


/////////////
// ACTIONS //
/////////////

const dummyRequests = Immutable.fromJS([
    {
// <<<<<<< HEAD
//         mentee: {
//             id: 1,
//             first_name: "Test",
//             last_name: "Test",
//             email: "test@marktai.com",
//             verified: false,
//             picture: null
//         },
//         mentor: {
//             id: 3,
//             profile: {
//                 id: 2,
//                 first_name: "Alex",
//                 last_name: "Longerbeam",
//                 email: "longerbeamalex@gmail.com",
//                 verified: true,
//                 picture: null
//             }
//         },
//         email_body: "Hey whats up hello",
//         preferred_mentee_email: "longerbeamalex@gmail.com",
//         phone: "",
//         date_created: "2017-12-03T22:36:17.422868Z"
//     },
//     {
//         mentee: {
//             id: 1,
//             first_name: "Test",
//             last_name: "Test",
//             email: "test@marktai.com",
//             verified: false,
//             picture: null
//         },
//         mentor: {
//             id: 2,
//             profile: {
//                 id: 2,
//                 first_name: "Alex",
//                 last_name: "Longerbeam",
//                 email: "longerbeamalex@gmail.com",
//                 verified: true,
//                 picture: null
//             }
//         },
//         email_body: "Hey whats up hello",
//         preferred_mentee_email: "longerbeamalex@gmail.com",
//         phone: "",
//         date_created: "2017-12-03T22:36:17.422868Z"
//     }
// =======
        name: "Krystal Xu",
        major: "Linguistics and Computer Science",
        year: 4,
        message: "\"I am currently confused about whether to be a South Campus Major or a North Campus Major. I feel that I do better in Humanities classes but I also like CS. I need help\"",
        role: 1,
        date: "1 Nov 2017",
        kind: "Received"
    },
    {
        name: "Michael Chen",
        major: "Linguistics and Computer Science",
        year: 2,
        message: "\"I realised I'm really bad at my classes and I'm thinking of switching major\"",
        role: 0,
        date: "30 Aug 2017",
        kind: "Received" 

    },
    {
        name: "Ram Goli",
        major: "Linguistics and Computer Science",
        year: 2,
        message: "\"I need help\"",
        role: 1,
        date: "26 Jun 2017",
        kind: "Sent"

    },
    {
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        message: "\"I need help\"",
        role:1,
        date: "20 Jun 2017",
        kind: "Sent"

    },
    {
        name: "Mark Song",
        major: "Linguistics and Computer Science",
        year: 2,
        message: "\"I need help\"",
        role: 0,
        date: "5 May 2017",
        kind: "Sent"

    },
// >>>>>>> done UI designing for requests. but stil need to hook up with backend API.
])

const startGettingRequests = () => {
    return {
        type: START_GETTING_REQUESTS
    }
}

const finishGettingRequests = (requests) => {
    return {
        type: FINISH_GETTING_REQUESTS,
        requests
    };
}

const getRequests = () => {
	return dispatch => {
		dispatch(startGettingRequests())
		
		setTimeout(() => {
			dispatch(finishGettingRequests(dummyRequests));
		},1);
	};
}

const sendRequest = (message, mentorId) => {
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
        case START_GETTING_REQUESTS: {
            return state.withMutations(val => {
                val.set('loading', true);
            })
        }
        case FINISH_GETTING_REQUESTS: {
            return state.withMutations(val => {
                val.set('loading', false);
                val.setIn(['requests'], action.requests);
            })
        }
        case SEND_REQUEST_START: {
            return state.withMutations(val => {
                val.set('loading', true);
            });
        }
        case SEND_REQUEST_SUCCESS: {
            return state.withMutations(val => {
                const requests = val.get('requests');
                val.set('requests', requests.push(action.request));
            });
        }
        case SEND_REQUEST_ERROR: {
            return state.withMutations(val => {
                val.set('error', action.error);
            });
        }
        default: {
            return state;
        }
    }
}



export { Requests, getRequests, sendRequest }

