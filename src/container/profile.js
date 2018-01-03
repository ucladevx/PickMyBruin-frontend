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

    _updateBio = (bio) => {
        
    }

    render() {
        return (
            <Profile 
                profile={this.props.profile}
                updateMentorStatus={this.props.updateMentorStatus}
                updateBio={this.props.updateBio}
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
        updateBio: (bio) => {
            dispatch(Actions.profileActions.updateBio(bio));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
