import Immutable from 'immutable';

const SEND_VERIFICATION_LINK = 'send_verification_link';

const START_SEND_VERIFICATION_LINK = 'start_send_verification_link';
const SEND_VERIFICATION_LINK_SUCCESS = 'send_verification_link_success';
const SEND_VERIFICATION_LINK_FAILURE = 'send_verification_link_failure';

/////////////
// ACTIONS //
/////////////
const startSendVerificationLink = (email) => {
    return {
        type: START_SEND_VERIFICATION_LINK,
        email
    }
}
const sendVerificationLink = (email) => {
    return (dispatch) => {
        const fullEmail = email + '@ucla.edu';
        dispatch(startSendVerificationLink(fullEmail));  //start

        // Just for testing //in between going to send things to backend 
        setTimeout(() => {
            dispatch({type: SEND_VERIFICATION_LINK_SUCCESS}); //end
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
            })
        }
        default: {
            return state;
        }
    }
}

export {
    Register, sendVerificationLink
};