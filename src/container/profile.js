import React from 'react';
import { connect } from 'react-redux';

import Profile from '../components/profile';

class ProfileContainer extends React.Component {
    render() {
        return (
            <Profile />
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);