import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    user: {},
    verifiedEmail: false,
    registerSuccess: false,
    error: null
});

const Register = (state = defaultState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export {
    Register
};