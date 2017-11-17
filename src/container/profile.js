import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../reducer';
import Profile from '../components/pages/profile';

class ProfileContainer extends React.Component {
    render() {
        return (
            <Profile 
            />
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSearch: major => {
            dispatch(Actions.searchMentorsActions.handleSearch(major));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);