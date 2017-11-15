import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../reducer';
import Profile from '../components/profile';

class ProfileContainer extends React.Component {
    render() {
        return (
            <Profile 
                handleSearch={this.props.handleSearch}
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