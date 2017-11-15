import Immutable from 'immutable';
import Config from '../config';
import Storage from '../storage';
import { replace } from 'react-router-redux';

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
    const token = Storage.get('token');

    return dispatch => {
        if (!token) {
            // we need them to login
            dispatch(push('/login'));
        }

        // Django will figure out which user to return from the token
        let headers = new Headers({
            "Authorization": `Bearer ${token}`
        });
        fetch(Config.API_URL + '/users/me/', {
            method: 'GET',
            headers
        })
        
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

const defaultState = () => {
    const token = Storage.get('token');
    
    return Immutable.fromJS({
        error: null,
        loading: false,
        authenticated: !!token,
        user: {
            id: null,
            first_name: '',
            las_name: '',
            email: '',
            year: '',
            verified: false,
        }
    });
}

const Profile = (state = defaultState(), action) => {
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

export { Profile, fetchProfile, updateProfile };