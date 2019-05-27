import React from 'react';

import Blog from '../components/pages/blog';
import { connect } from 'react-redux';

import { Actions } from '../reducer';

class BlogContainer extends React.Component {
    render() {
        return (
            <Blog
                blogs = {this.props.blogs}
                createBlog = {this.props.createBlog}
                fetchBlog = {this.props.fetchBlog}
                updateBlog = {this.props.updateBlog}
                deleteBlog = {this.props.deleteBlog}
            />
        )
    }
}

const mapStateToProps = state => {
    const Blog = state.Blog;
    return {
        blogs: Blog.get('blogs'),
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBlog: (username, title, body, anonymous, publish) => {
            dispatch(Actions.blogActions.createBlog(username, title, body, anonymous, publish));
        },
        fetchBlog: (userid, blogid) => {
            dispatch(Actions.blogActions.fetchBlog(userid, blogid));
        },
        updateBlog: (userid, blogid, title, body, anonymous, publish) => {
            dispatch(Actions.blogActions.updateBlog(userid, blogid, title, body, anonymous, publish));
        },
        deleteBlog: (userid, blogid) => {
            dispatch(Actions.blogActions.deleteBlog(userid, blogid));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
