import React from 'react';
import { connect } from 'react-redux';

import Search from '../components/pages/search';

class SearchContainer extends React.Component {
    render() {
        return (
            <Search />
        );
    }
}

export default SearchContainer;