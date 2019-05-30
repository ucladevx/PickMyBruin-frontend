import Immutable, { fromJS } from 'immutable';
import Config from '../config';
import Storage from '../storage';
import { addNotification as notify } from 'reapop';

/////////////
/// TYPES ///
/////////////

const SET_BLOG_STATE = 'set_blog_state';
const BLOG_SEARCH_SUCCESS = 'blog_search_success';

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

const fetchBlog = blogid => {
    return async dispatch => {
        try {
            const token = Storage.get('token');

            const response = await fetch(Config.API_URL + `/blogs/id/${blogid}`, {
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

const updateBlog = (blogid, title, body, anonymous, publish) => {
    return async dispatch => {
        try {
            const token = Storage.get('token');

            const response = await fetch(Config.API_URL + `/blogs/id/${blogid}`, {
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

const deleteBlog = blogid => {
    return async dispatch => {
        try {
            const token = Storage.get('token');

            const response = await fetch(Config.API_URL + `/blogs/id/${blogid}`, {
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

const searchBlogs = query => {
    return async dispatch => {
        try {
            const token = Storage.get('token');

            const response = await fetch(Config.API_URL + `/blogs?query=${query}`, {
                method: 'GET',
                headers: new Headers({
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                })
            })

            const data = await response.json();

            dispatch(searchResults(data));

        } catch (error) {
            dispatch(notify({title: 'Error!', status: 'error', message: error.message, position: 'tc'}));
        }
    }
}

const setBlogState = blog => {
    return {
        type: SET_BLOG_STATE,
        blog
    }
}

const searchResults = data => {
    return {
        type: BLOG_SEARCH_SUCCESS,
        data
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
            return state.withMutations(val => {
                val.set('blogs', fromJS(action.blog));
            });
        }
        case BLOG_SEARCH_SUCCESS: {
            return state.withMutations(val => {
                val.set('blogs', fromJS(action.data.results.map(blog => {
                    return blog;
                })));
            })
        }
        default: {
            return state;
        }
    }
}

export { Blog, createBlog, fetchBlog, updateBlog, deleteBlog, searchBlogs, setBlogState, searchResults };
