import React from 'react';

class SearchBar extends React.Component {
    // state = {
    //     value: '',
    //     searched: false,
    //     query: ''
       
    // }
    
    constructor(props) {
        super(props);
        this.state = {
            // search_query : ""
            searchURL : ""
        }
        // this.getQuery = this.getQuery.bind(this);
    }

    submit = e => {
        e.preventDefault();

        this.props.handleSearch(this.state.value);
        this.setState({
            searched: true
        });
    }

    // handleChange = e => {
    //     this.props.getQuery(e.target.value);
    // }

   handleChange(e) {
        const { name, value } = e.target;

        this.setState({
          [name]: value
        });

        updateURL();
    }

    updateURL() {
        const nameSelected = this.state.name ? true : false;
        const yearSelected = this.state.year ? true : false;
        const majorSelected = this.state.major ? true : false;
        const mentorSelected = this.state.mentor ? true : false;

        const URL="/search/name=${nameSelected}year=${yearSelected}major=${majorSelected}mentor=${mentorSelected}";
        
        this.setState({ searchURL: URL});

    }
    
    // getQuery = () => {this.state.query}

    render() {
        return (
            <div className="search--search-container">
                <form className="search--animated" onSubmit={this.submit}>
                    <input 
                        className="field--input" 
                        type="text" 
                        placeholder="Search name, major, ..." 
                        value={this.props.searchQuery}
                        
                        onChange={(e) => this.props.getQuery(e.target.value)}
                        required
                    />
                                    
                </form>
                <div className="filter" style={{display: 'flex', 
                  justifyContent: 'center'}}>
                        <input type="radio" value="name" name="name" onChange={this.handleChange}/> Name
                        <input type="radio" value="year" name="year" onChange={this.handleChange}/> Year
                        <input type="radio" value="major" name="major" onChange={this.handleChange}/> Major
                        <input type="radio" value="mentor" name="mentor" onChange={this.handleChange}/> Mentor
                </div> 


            </div>
        );
    }
}
export default SearchBar;