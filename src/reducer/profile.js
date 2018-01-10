import Immutable, { fromJS } from 'immutable';
import { replace, push } from 'react-router-redux';
import { addNotification as notify } from 'reapop';

import Config from '../config';
import Storage from '../storage';

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
const SET_MENTOR_PROFILE = 'set_mentor_profile';
const REMOVE_PROFILE_INFO = 'remove_profile_info';

/////////////
// ACTIONS //
/////////////

const updateMentorStatus = wantToBeActive => {
    return async dispatch => {
        try {
            const token = Storage.get('token');
            if (!token) {
                // we need them to login
                dispatch(push('/login'));
            }

            // get regular profile info
            const response = await fetch(Config.API_URL + '/mentors/me/', {
                method: wantToBeActive ? 'POST' : 'PATCH',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }),
                body: !wantToBeActive ? JSON.stringify({
                    active: false
                    }) : null
            })

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error("Error creating a mentor profile");
            } else {
                dispatch(setMentorProfile(data));
            }
        } catch (error) {
            // handle errors here
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'}));
        }
    }
}

const updateMentorProfile = body => {
    return async dispatch => {
        try {
            const token = Storage.get('token');
            if (!token) {
                // we need them to login
                dispatch(push('/login'));
            }
            const response = await fetch(Config.API_URL + '/mentors/me/', {
                method: 'PATCH',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }),
                body: JSON.stringify(body)
            })

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error("We couldn't update your mentor profile");
            } else {
                dispatch(notify({message: "Your mentor profile is updated", position: 'tc', status: 'success'}));
                dispatch(setMentorProfile(data));
            }
        } catch (error) {
            dispatch(notify({title: "Error", message: error.message, position: 'tc', status: 'error'}))
        }
    }
}

const updateUserProfile = body => {
    return async dispatch => {
        try {
            const token = Storage.get('token');
            if (!token) {
                // we need them to login
                dispatch(push('/login'));
            }
            const response = await fetch(Config.API_URL + '/users/me/', {
                method: 'PATCH',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }),
                body: JSON.stringify(body)
            })

            const status = await response.status;
            const data = await response.json();

            if (status > 299 || status < 200) {
                throw new Error("We couldn't update your profile");
            } else {
                dispatch(notify({message: "Your profile is updated", position: 'tc', status: 'success'}));
                dispatch(setProfile(data));
            }
        } catch (error) {
            dispatch(notify({title: "Error", message: error.message, position: 'tc', status: 'error'}))
        }
    }
}

const fetchProfile = () => {
    return async dispatch => {
        try {
            const token = Storage.get('token');
            if (!token) {
                // we need them to login
                dispatch(push('/login'));
            }

            // get regular profile info
            const userResponse = await fetch(Config.API_URL + '/users/me/', {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`
                })
            })

            // check if they are also a mentor
            const mentorResponse = await fetch(Config.API_URL + '/mentors/me/', {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`
                })
            })

            const userStatus = await userResponse.status;
            const userData = await userResponse.json();

            if (userStatus == 401) {
                throw new Error("Error getting authentication");
            }

            if (userStatus > 299 || userStatus < 200) {
                throw new Error("Error fetching profile");
            } else {
                dispatch(setProfile(userData));
            }

            const mentorStatus = await mentorResponse.status;
            const mentorData = await mentorResponse.json();

            if (mentorStatus == 401) {
                throw new Error("Error getting authentication");
            }

            if (mentorStatus < 299 && mentorStatus >= 200) {
                // they are also a mentor!
                dispatch(setMentorProfile(mentorData));
            }

            // if mentorStatus is 404, they have no mentor profile
        } catch (error) {
            // handle errors here
            Storage.remove('token');
            dispatch(replace('/login'));
        }
    }
}

const setProfile = profile => {
    return {
        type: SET_PROFILE,
        profile
    }
}

const setMentorProfile = profile => {
    return {
        type: SET_MENTOR_PROFILE,
        profile
    }
}

const removeProfileInfo = () => {
    return {
        type: REMOVE_PROFILE_INFO
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
        user: {},
        mentor: {}
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
        case SET_MENTOR_PROFILE: {
            return state.withMutations(val => {
                delete action.profile.profile
                val.set('mentor', fromJS(action.profile));
            });
        }
        case REMOVE_PROFILE_INFO: {
            return state.withMutations(val => {
                val.set('mentor', fromJS({}));
                val.set('user', fromJS({}));
            })
        }
        default: {
            return state;
        }
    }
}

export { Profile, fetchProfile, setProfile, removeProfileInfo, updateMentorStatus, updateMentorProfile, updateUserProfile };
