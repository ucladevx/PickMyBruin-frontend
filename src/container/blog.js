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
                searchBlogs = {this.props.searchBlogs}
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
        fetchBlog: blogid => {
            dispatch(Actions.blogActions.fetchBlog(blogid));
        },
        updateBlog: (blogid, title, body, anonymous, publish) => {
            dispatch(Actions.blogActions.updateBlog(blogid, title, body, anonymous, publish));
        },
        deleteBlog: blogid => {
            dispatch(Actions.blogActions.deleteBlog(blogid));
        },
        searchBlogs: query => {
            dispatch(Actions.blogActions.searchBlogs(query));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer);
