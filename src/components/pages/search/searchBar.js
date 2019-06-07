import React from 'react';
import { PropTypes } from 'react';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class SearchBar extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.handleChange = this.handleChange.bind(this);
    // }
    constructor (props) {
    super(props);

    this.state = { cSelected: [],
                    value : "",
        name: false,
        year: false,
        major: false,
        mentor: false

     };

    this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
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
            name: true,

        })
        this.setState({ cSelected: [...this.state.cSelected] });

    }

    handleChangeYear = e => {
        e.preventDefault();

        this.setState ({
            year: true,
        })
        this.setState({ cSelected: [...this.state.cSelected] });

    }

    handleChangeMajor = e => {
        e.preventDefault();

        this.setState ({
            major: true, 
        })
        this.setState({ cSelected: [...this.state.cSelected] });

    }

    handleChangeMentor = e => {
        e.preventDefault();

        this.setState ({
            mentor: true,
        })
        this.setState({ cSelected: [...this.state.cSelected] });

    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
          this.state.cSelected.push(selected);
        } else {
          this.state.cSelected.splice(index, 1);
        }
        this.setState({ cSelected: [...this.state.cSelected] });
        switch (selected) {
            case 1:
                this.setState ({name: !this.state.name});
                break;
            case 2:
                this.setState ({year: !this.state.year});
                break;
            case 3:
                this.setState ({major: !this.state.major});
                break;

            case 4:
                this.setState ({mentor: !this.state.mentor});
                break;
            default:
                break;

        }
      }

    render() {
        return (
            <div>
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
                <br></br>
                <br></br>
                <p style={{fontWeight: 'bold', display: 'flex', justifyContent: 'center'}}>Filter by: </p>
                <br></br>
                <div className="filter" style={{display: 'flex', justifyContent: 'center'}}>
                      
                    <ButtonGroup>
                      <Button outline color="info" onClick={() => this.onCheckboxBtnClick(1)} active={this.state.cSelected.includes(1)}>Name</Button>
                      <Button outline color="info" onClick={() => this.onCheckboxBtnClick(2)} active={this.state.cSelected.includes(2)}>Year</Button>
                      <Button outline color="info" onClick={() => this.onCheckboxBtnClick(3)} active={this.state.cSelected.includes(3)}> Major</Button>
                      <Button outline color="info" onClick={() => this.onCheckboxBtnClick(4)} active={this.state.cSelected.includes(4)}>Mentor</Button>
                    </ButtonGroup>
                </div> 
                

            </div>
        );
    }
}

export default SearchBar;
