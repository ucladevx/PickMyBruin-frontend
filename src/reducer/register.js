import Immutable from 'immutable';

const SEND_VERIFICATION_LINK = 'send_verification_link';
const START_SEND_VERIFICATION_LINK = 'start_send_verification_link';

/////////////
// ACTIONS //
/////////////
const startSendVerificationLink = () => {
    return {
        type: START_SEND_VERIFICATION_LINK
    }
}
const sendVerificationLink = (email) => {
    return (dispatch) => {
        dispatch(startSendVerificationLink());
    }
}

const defaultState = Immutable.fromJS({
    user: {},
    verifiedEmail: false,
    sendingEmail: false,
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
        default: {
            return state;
        }
    }
}

export {
    Register, sendVerificationLink
};