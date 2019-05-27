import Immutable, { fromJS } from 'immutable';
import Config from '../config';
import Storage from '../storage';

/////////////
/// TYPES ///
/////////////

const SET_BLOG_STATE = 'set_blog_state';

/////////////
// ACTIONS //
/////////////

const createBlog = (username, title, body, anonymous, publish) => {
    return async dispatch => {
        try {
            const token = Storage.get('token');

            const response = await fetch(Config.API_URL + `/blogs/${username}/`, {
                method: 'POST',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }),
                body: JSON.stringify({
                    title, body, anonymous, publish
                })
            })

            const data = await response.json();

            dispatch(setBlogState(data));

        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'}));
        }
    }
};

const fetchBlog = (userid, blogid) => {
    return async dispatch => {
        try {
            const token = Storage.get('token');

            const response = await fetch(Config.API_URL + `/blogs/${userid}/${blogid}`, {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                })
            })

            const data = await response.json();

            dispatch(setBlogState(data));

        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'}));
        }
    }
};

const updateBlog = (userid, blogid, title, body, anonymous, publish) => {
    return async dispatch => {
        try {
            const token = Storage.get('token');

            const response = await fetch(Config.API_URL + `/blogs/${userid}/${blogid}`, {
                method: 'PATCH',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }),
                body: JSON.stringify({
                    title, body, anonymous, publish
                })
            })

            const data = await response.json();

            dispatch(setBlogState(data));

        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'}));
        }
    }
};

const deleteBlog = (userid, blogid) => {
    return async dispatch => {
        try {
            const token = Storage.get('token');

            const response = await fetch(Config.API_URL + `/blogs/${userid}/${blogid}`, {
                method: 'DELETE',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                })
            })

        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'}));
        }
    }
};

const setBlogState = blog => {
    return {
        type: SET_BLOG_STATE,
        blog
    }
}

///////////
// STATE //
///////////

const defaultState = () => {
    return Immutable.fromJS({
        blogs: []
    });
}

const Blog = (state = defaultState(), action) => {
    switch (action.type) {
        case SET_BLOG_STATE: {
            
            const newState =  state.withMutations(val => {
                val.set('blogs', fromJS(action.blog));
            });
            console.log("new state in reducer", newState.get('blogs').toObject());
            return newState;
        }

        default: {
            return state;
        }
    }
}

export { Blog, createBlog, fetchBlog, updateBlog, deleteBlog, setBlogState };
