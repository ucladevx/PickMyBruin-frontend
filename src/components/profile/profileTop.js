import React from 'react';
import majors from '../../majors.json';
import Search from '../searchBar';

class ProfileTop extends React.Component {
    constructor(props) {
        super(props);
        this.words = majors;
    }

    render() {
        return(
            <div className="top">
                <Search />
                <h1>Wandi Liu</h1>
            </div>
        );
    }
}

export default ProfileTop;