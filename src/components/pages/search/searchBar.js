import React from 'react';

class SearchBar extends React.Component {
   
    
    constructor(props) {
        super(props);
        this.state = {
            // search_query : ""
            searchURL : ""
        }
    
        this.handleChange = this.handleChange.bind(this);
    }

  

    

   handleChange(e) {

        e.preventDefault
        const { name, value } = e.target;

        
     
        const nameSelected = this.state.name ? true : false;
        const yearSelected = this.state.year ? true : false;
        const majorSelected = this.state.major ? true : false;
        const mentorSelected = this.state.mentor ? true : false;

        const URL="${value}&name=${nameSelected}&year=${yearSelected}&major=${majorSelected}&mentor=${mentorSelected}";
        
        this.setState({ searchURL: URL});

    
    }

    render() {
        return (
            <div className="search--search-container">
                <form className="search--animated" onSubmit={this.handleChange}>
                    <input 
                        className="field--input" 
                        type="text" 
                        placeholder="Search name, major, ..." 
                        value={this.searchURL}
                        
                        onChange={(e) => this.handleChange(e)}
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