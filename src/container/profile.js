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
                profile={this.props.profile}
                updateMentorStatus={this.props.updateMentorStatus}
                updateUserProfile={this.props.updateUserProfile}
                updateMentorProfile={this.props.updateMentorProfile}
            />
        )
    }
}

const mapStateToProps = state => {
    const Profile = state.Profile
    return {
        profile: Profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProfileData: () => {
            dispatch(Actions.profileActions.fetchProfile());
        },
        updateMentorStatus: (status) => {
            dispatch(Actions.profileActions.updateMentorStatus(status));
        },
        updateUserProfile: body => {
            dispatch(Actions.profileActions.updateUserProfile(body));
        }, 
        updateMentorProfile: body => {
            dispatch(Actions.profileActions.updateMentorProfile(body));
        }, 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
