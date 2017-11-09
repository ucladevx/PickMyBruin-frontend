import Immutable from 'immutable';

/////////////
/// TYPES ///
/////////////

const FETCH_PROFILE_START = 'fetch_profile_start';
const FETCH_PROFILE_SUCCESS = 'fetch_profile_success';
const FETCH_PROFILE_ERROR = 'fetch_profile_failure';

const UPDATE_PROFILE_START = 'update_profile_start';
const UPDATE_PROFILE_SUCCESS = 'update_profile_success';
const UPDATE_PROFILE_ERROR = 'update_profile_error';

/////////////
// ACTIONS //
/////////////

const fetchProfile = () => {
    return dispatch => {
        // fetch profile from backend

        
    }
}

const updateProfile = () => {
    return dispatch => {
        // update profile
    }
}

///////////
// STATE //
///////////

const defaultState = Immutable.fromJS({
    error: null,
    loading: false,
    user: {

    }
})

const Profile = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_PROFILE_START: {
            return state.withMutations(val => {
                val.set('loading', true);
            })
        }
        case FETCH_PROFILE_SUCCESS: {
            return state.withMutations(val => {
                val.set('loading', false);
            })
        }
        default: {
            return state;
        }
    }
}

export { fetchProfile, Profile };