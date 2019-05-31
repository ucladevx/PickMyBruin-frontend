import React from 'react';

import NavBar from '../../navbar';
import Footer from '../../footer';
import Button from '../../util/Button';

import BlogSearchResult from './blogSearchResult';

class Blog extends React.Component {
    state = {
        searched: false,
    }
    
    createBlog = () => {
        const username = "jhan25";
        const title = "Testing 123";
        const body = "Testing 123";
        const anonymous = false;
        const publish = true;

        this.props.createBlog(username, title, body, anonymous, publish);
    }
    
    deleteBlog = () => {
        const userid = this.props.blogs.getIn(['user']);
        const blogid = this.props.blogs.getIn(['id']);
        const title = this.props.blogs.getIn(['title']);

        console.log(userid);
        console.log(blogid);
        console.log(title);

        console.log(this.props.blogs);
    }

    searchBlogs = () => {
        this.props.searchBlogs('');
        this.setState({
            searched: true,
        });
    }

    render() {
        return (
            <div className="blog-container">
                <NavBar />
                <Button onClick={this.createBlog} color="green">Create!</Button>
                <Button onClick={this.deleteBlog} color="green">Delete!</Button>
                <Button onClick={this.searchBlogs} color="green">Search!</Button>
                <br /><br />
                {this.state.searched && this.props.blogs.map(blog => 
                    <BlogSearchResult
                        key = '1'
                        blog = {blog}
                    />
                )}
                <Footer />
            </div>
        )
    }
}

export default Blog;
