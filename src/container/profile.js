import React from 'react';
import { connect } from 'react-redux';

import { Actions } from '../reducer';
import Profile from '../components/pages/profile';

class ProfileContainer extends React.Component {
    componentDidUpdate() {
        if (!this.props.profile.getIn(['user', 'id'])) {
            // We need to fetch profile data
            this.props.fetchProfileData()
        }
    }

    render() {
        return (
            <div>
                <Profile 
                    profile={this.props.profile}
                    logout={this.props.logout}
                    updateMentorStatus={this.props.updateMentorStatus}
                    updateUserProfile={this.props.updateUserProfile}
                    updateMentorProfile={this.props.updateMentorProfile}
                    setProfilePic={this.props.setProfilePic}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const Profile = state.Profile;
    return {
        profile: Profile,
        
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
        setProfilePic: pic => {
            dispatch(Actions.profileActions.setProfilePic(pic));
        },
        logout: () => {
            dispatch(Actions.loginActions.logout());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
