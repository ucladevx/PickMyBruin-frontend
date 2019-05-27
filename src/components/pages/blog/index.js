import React from 'react';

import NavBar from '../../navbar';
import Footer from '../../footer';
import Button from '../../util/Button';

class Blog extends React.Component {
    createBlog = () => {
        const username = "jhan25";
        const title = "Testing 123";
        const body = "Testing 123";
        const anonymous = false;
        const publish = true;

        this.props.createBlog(username, title, body, anonymous, publish);
    }
    
    deleteBlog = () => {
        // const userid = this.props.blogs[1].getIn(['user']);
        // const blogid = this.props.blogs[1].getIn(['id']);

        // console.log(userid);
        // console.log(blogid);

        console.log(this.props.blogs);
    }

    render() {
        return (
            <div className="blog-container">
                <NavBar />
                <Button onClick={this.deleteBlog} color="green">Click me!</Button>
                <Footer />
            </div>
        )
    }
}

export default Blog;
