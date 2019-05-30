import React from 'react';

class BlogSearchResult extends React.Component {
    render() {
        return(
            <div>
                <h1>{this.props.blog.title}</h1>
            </div>
        )
    }
}

export default BlogSearchResult;
