import Immutable, { fromJS } from 'immutable';
import Config from '../config';
import Storage from '../storage';
import { replace } from 'react-router-redux';
import { addNotification as notify } from 'reapop';

/////////////
/// TYPES ///
/////////////

const FETCH_PROFILE_START = 'fetch_profile_start';
const FETCH_PROFILE_SUCCESS = 'fetch_profile_success';
const FETCH_PROFILE_ERROR = 'fetch_profile_failure';

const UPDATE_PROFILE_START = 'update_profile_start';
const UPDATE_PROFILE_SUCCESS = 'update_profile_success';
const UPDATE_PROFILE_ERROR = 'update_profile_error';

const SET_PROFILE = 'set_profile';

/////////////
// ACTIONS //
/////////////

const fetchProfile = () => {
    return async dispatch => {
        try {
            const token = Storage.get('token');
            if (!token) {
                // we need them to login
                dispatch(push('/login'));
            }

            // Django will figure out which user to return from the token
            const response = await fetch(Config.API_URL + '/users/me/', {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`
                })
            })

            const status = await response.status;
            const data = await response.json();
            
            if (status > 299 || status < 200) {
                throw new Error("Error fetching profile");
            } else {
                dispatch(setProfile(data))
            }
        } catch (error) {
            // handle errors here
            dispatch(notify({title: 'Error!', status: 'error', message: 'There was an error fetching your profile', position: 'tc'}));
        }
    }
}

const updateProfile = () => {
    return dispatch => {
        // update profile
    }
}

const setProfile = profile => {
    return {
        type: SET_PROFILE,
        profile
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
            last_name: '',
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
        case SET_PROFILE: {
            return state.withMutations(val => {
                val.set('user', fromJS(action.profile))
            })
        }
        default: {
            return state;
        }
    }
}

export { Profile, fetchProfile, updateProfile, setProfile };