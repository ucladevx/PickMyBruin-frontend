import Immutable from 'immutable';
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

/////////////
// ACTIONS //
/////////////
const startSendVerificationLink = (email) => {
    return {
        type: START_SEND_VERIFICATION_LINK,
        email
    }
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
                body: JSON.stringify({
                    email: fullEmail,
                    password
                })
            })
            const status = await response.status;
            if (status > 299 || status < 200) {
                console.log('error!');
                throw new Error("Error registering");
            } else {
                dispatch({type: SEND_VERIFICATION_LINK_SUCCESS});
            }
        } catch (error) {
            // handle errors here
            dispatch({type: SEND_VERIFICATION_LINK_FAILURE, message: error.message});
        }
    }
}


const confirmCode = (profile_id, verification_code) => {
    return dispatch => {
        dispatch({type: VERIFY_CODE_START});

        // fetch(Config.API_URL + `/users/${profile_id}/verify`, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         code: verification_code
        //     })
        // }).then(resp => resp.json())
            
        // For testing
        setTimeout(() => {
            dispatch(verifyCodeSuccess("78987"));
        }, 1000);
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
                val.setIn(['user', 'email'], action.email);
            });
        }
        case SEND_VERIFICATION_LINK_SUCCESS: {
            return state.withMutations(val => {
                val.set('sendingEmail', false);
                val.set('sentEmail', true);
            });
        }
        case SEND_VERIFICATION_LINK_FAILURE: {
            return state.withMutations(val => {
                val.set('error', action.message);
                val.set('sendingEmail', false);
                val.set('sentEmail', false);
            })
        }
        case VERIFY_CODE_SUCCESS: {
            return state.withMutations(val => {
                val.set('registerSuccess', true);
                val.setIn(['user', 'profile_id'], action.profile_id);
            });
        }
        default: {
            return state;
        }
    }
}

export {
    Register, sendVerificationLink, confirmCode
};