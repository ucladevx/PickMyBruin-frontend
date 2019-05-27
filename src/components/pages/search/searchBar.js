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
    }

    handleChangeYear = e => {
        e.preventDefault();

        this.setState ({
            year: e.target.value,
        })
    }

    handleChangeMajor = e => {
        e.preventDefault();

        this.setState ({
            major: e.target.value, 
        })
    }

    handleChangeMentor = e => {
        e.preventDefault();

        this.setState ({
            mentor: e.target.value,
        })
    }

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
                <div className="filter" style={{display: 'flex', justifyContent: 'center'}}>
                    <input type="radio" value={this.state.name} name="name" onChange={this.handleChangeName}/> Name
                    <input type="radio" value={this.state.year} name="year" onChange={this.handleChangeYear}/> Year
                    <input type="radio" value={this.state.major} name="major" onChange={this.handleChangeMajor}/> Major
                    <input type="radio" value={this.state.mentor} name="mentor" onChange={this.handleChangeMentor}/> Mentor
                </div> 
            </div>
        );
    }
}

export default SearchBar;
