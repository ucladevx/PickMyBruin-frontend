import React from 'react';
import SearchBar from 'react-search-bar';

let words = ['Computer Science', 'Linguistics'];

class ProfileTop extends React.Component {
    constructor(props) {
        super(props);
        this.words = words;
    }

    state = {
        suggestions: []
    }

    handleClear = () => {
        this.setState({
          suggestions: []
        });
    }
    
    handleChange = input => {
        this.setState({
          suggestions: this.words.filter(word => word.toLowerCase().startsWith(input))
        });
    }

    suggestionRenderer = (suggestion, searchTerm) => {
        return (
          <span>
            <span>{searchTerm}</span>
            <strong>{suggestion.substr(searchTerm.length)}</strong>
          </span>
        );
    }


    render() {
        return(
            <div className="top">
                <SearchBar 
                    placeholder="Search by major..."
                    suggestions={this.state.suggestions}
                    onChange={this.handleChange}
                    onClear={this.handleClear}
                    suggestionRenderer={this.suggestionRenderer}
                    suggestions={this.state.suggestions}    
                />
                <h1>Wandi Liu</h1>
            </div>
        );
    }
}

export default ProfileTop;