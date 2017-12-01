import Immutable from 'immutable';
import { addNotification as notify } from 'reapop';

import { setProfile } from './profile';
import Storage from '../storage';
import Config from '../config';

////////////
// TYPES  //
////////////

const START_SEND_VERIFICATION_LINK = 'start_send_verification_link';
const SEND_VERIFICATION_LINK_SUCCESS = 'send_verification_link_success';
const SEND_VERIFICATION_LINK_FAILURE = 'send_verification_link_failure';

const VERIFY_CODE_START = 'verify_code_start';
const VERIFY_CODE_SUCCESS = 'verify_code_success';
const VERIFY_CODE_FAILURE = 'verify_code_failure';

const COMPLETE_REGISTRATION_START = 'complete_registration_start';
const COMPLETE_REGISTRATION_SUCCESS = 'complete_registration_success';
const COMPLETE_REGISTRATION_FAILURE = 'complete_registration_failure';

/////////////
// ACTIONS //
/////////////
const startSendVerificationLink = (email) => {
    return {
        type: START_SEND_VERIFICATION_LINK,
        email
    }
}


const registerEmailSuccess = (email, profileId) => {
    return {
        type: SEND_VERIFICATION_LINK_SUCCESS,
        email,
        profileId
    };
}

const verifyCodeSuccess = profile_id => {
    return {
        type: VERIFY_CODE_SUCCESS,
        profile_id
    }
}

const sendVerificationLink = (email, password) => {
    return async (dispatch) => {
        try {
            const fullEmail = email + '@ucla.edu';
            dispatch(startSendVerificationLink(fullEmail));

            const response = await fetch(Config.API_URL + '/users/users/', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    email: fullEmail,
                    password
                })
            });

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error(data.error);
            } else {
                dispatch(registerEmailSuccess(data.user.email, data.id));
            }
        } catch (error) {
            // handle errors here
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'}));
            dispatch({type: SEND_VERIFICATION_LINK_FAILURE, message: error.message});
        }
    }
}

const confirmCode = (verification_code) => {
    return async dispatch => {
        try {
            dispatch({type: VERIFY_CODE_START});

            const response = await fetch(Config.API_URL + '/verify/', {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    code: verification_code
                })
            })

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error(data.error);
            } else {

            }
        } catch (error) {

        }
    }
}

const completeRegistration = (fullName, year) => {
    return async dispatch => {
        try {
            dispatch({type: COMPLETE_REGISTRATION_START});

            const nameArray = fullName.split(' ');

            const response = await fetch(Config.API_URL + '/users/me/', {
                method: 'PATCH',
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Storage.get("token")}`
                }),
                body: JSON.stringify({
                    year,
                    user: {
                        first_name: nameArray.slice(0, nameArray.length-1).join(' '),
                        last_name: nameArray[nameArray.length-1]  // last name
                    }
                })
            })

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error(data.error);
            } else {
                setProfile(data);
                dispatch({type: COMPLETE_REGISTRATION_SUCCESS});
            }
        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'})); 
        }
    }
}

const defaultState = Immutable.fromJS({
    user: {},
    verifiedEmail: false,
    sendingEmail: false,
    sentEmail: false,
    registerSuccess: false,
    error: null
});

const Register = (state = defaultState, action) => {
    switch (action.type) {
        case START_SEND_VERIFICATION_LINK: {
            return state.withMutations(val => {
                val.set('sendingEmail', true);
            });
        }
        case SEND_VERIFICATION_LINK_SUCCESS: {
            return state.withMutations(val => {
                val.set('sendingEmail', false);
                val.set('sentEmail', true);
                val.setIn(['user', 'email'], action.email);
                val.setIn(['user', 'profileId'], action.profileId);
            });
        }
        case SEND_VERIFICATION_LINK_FAILURE: {
            return state.withMutations(val => {
                val.set('error', action.message);
                val.set('sendingEmail', false);
                val.set('sentEmail', false);
            });
        }
        case VERIFY_CODE_SUCCESS: {
            return state.withMutations(val => {
                val.set('verifiedEmail', true);
                val.setIn(['user', 'profile_id'], action.profile_id);
            });
        }
        case COMPLETE_REGISTRATION_SUCCESS: {
            return state.withMutations(val => {
                val.set('registerSuccess', true);
            })
        }
        default: {
            return state;
        }
    }
}

export {
    Register, sendVerificationLink, confirmCode, completeRegistration
};