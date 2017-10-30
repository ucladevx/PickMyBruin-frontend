import Immutable from 'immutable';
import Storage from '../storage';

///////////
// State //
///////////

const defaultState = () => {
    const token = Storage.get('token'); 

    return Immutable.fromJS({
        error: null,
        authenticated: !!token
    })
}

const Auth = (state=defaultState(), action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export { Auth };