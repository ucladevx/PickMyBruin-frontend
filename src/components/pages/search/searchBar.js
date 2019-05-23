import React from 'react';
import { PropTypes } from 'react';

class SearchBar extends React.Component {
   
    state = {
        value : "",
           name: false,
            year: false,
            major: false,
            mentor: false,
    }
  
    submit = e => {
        e.preventDefault();

        const nameString = this.state.name ? 'true' : 'false';
        const yearString = this.state.year ? 'true' : 'false';
        const majorString = this.state.major ? 'true' : 'false';
        const mentorString = this.state.mentor ? 'true' : 'false';

        // console.log(nameString);
        // console.log(yearString);
        // console.log(majorString);
        // console.log(mentorString);

        const URL=`${this.state.value}&name=${nameString}&year=${yearString}&major=${majorString}&mentor=${mentorString}`;
        console.log(URL);
        this.props.handleSearch(URL);
    }
    
   handleChange = e => {
       e.preventDefault();
       this.setState ({
           value: e.target.value,
       })
   }

   handleChangeName = e => {
       e.preventDefault();

       this.setState({
           name: e.target.value,

       })
       // console.log(e.target.value);
   }

   handleChangeYear = e => {
       e.preventDefault();

       this.setState ({
           year: e.target.value,
       })
       // console.log(e.target.value);
   }

   handleChangeMajor = e => {
       e.preventDefault();

       this.setState ({
           major: e.target.value, 
       })
       // console.log(e.target.value);
   }

   handleChangeMentor = e => {
       e.preventDefault();
       this.setState ({
           mentor: e.target.value,
       })
       // console.log(e.target.value);
   }


   // set up handle change for each parameter
   // set up appropriate string variables based on the boolean values

   // handleChange(e) {

   //      e.preventDefault
   //      const { name, value } = e.target;

   //      this.setState({
   //        [name]: value
   //      });

        
     
   //      const nameSelected = this.state.name ? 'true' : false;
   //      const yearSelected = this.state.year ? true : false;
   //      const majorSelected = this.state.major ? true : false;
   //      const mentorSelected = this.state.mentor ? true : false;

   //      const URL=`${value}&name=${nameSelected}&year=${yearSelected}&major=${majorSelected}&mentor=${mentorSelected}`;
        
   //      this.setState({ searchURL: URL});

    
   //  }

   // check functionality of the radio buttons
   // make use of console.log(variable) to test boolean values

    render() {
        return (
            <div className="search--search-container">
                <form className="search--animated" onSubmit={this.submit}>
                    <input 
                        className="field--input" 
                        type="text" 
                        placeholder="Search name, major, ..." 
                        value={this.state.value}
                        
                        // track change for query only
                        onChange={(e) => this.handleChange(e)}
                        required
                    />
                                    
                </form>
                <div className="filter" style={{display: 'flex', 
                  justifyContent: 'center'}}>
                        <input type="radio" value="name" name="name" onChange={this.handleChangeName}/> Name
                        <input type="radio" value="year" name="year" onChange={this.handleChangeYear}/> Year
                        <input type="radio" value="major" name="major" onChange={this.handleChangeMajor}/> Major
                        <input type="radio" value="mentor" name="mentor" onChange={this.handleChangeMentor}/> Mentor
                </div> 


            </div>
        );
    }
}
export default SearchBar;