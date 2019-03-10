import React from 'react';

class SearchBar extends React.Component {
    state = {
        value: '',
        searched: false,
        query: ''
       
    }

    submit = e => {
        e.preventDefault();

        this.props.handleSearch(this.state.value);
        this.setState({
            searched: true
        });
    }

    handleChange = e => {
        this.setState({
            value: e.target.value
            
        })
        this.setState({
            query: e.target.value
            
        })
    }

    renderSearchTerm = () => {
        
    }

    getQuery = () => {this.state.query}

    render() {
        return (
            <div className="search--search-container">
                <form className="search--animated" onSubmit={this.submit}>
                    <input 
                        className="field--input" 
                        type="text" 
                        placeholder="Search name, major, ..." 
                        value={this.state.value}
                        
                        onChange={this.handleChange}
                        required
                    />
                </form>
            </div>
        );
    }
}

export default SearchBar;