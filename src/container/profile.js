import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../reducer';
import Profile from '../components/pages/profile';

class ProfileContainer extends React.Component {
    componentDidMount() {
        if (!this.props.profile.get('id')) {
            // We need to fetch profile data
            this.props.fetchProfileData()
        }
    }
    render() {
        return (
            <Profile 
            />
        )
    }
}

const mapStateToProps = state => {
    const Profile = state.Profile
    return {
        profile: Profile.get('user')
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileData: () => {
            dispatch(Actions.profileActions.fetchProfile());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);