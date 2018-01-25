import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { Actions } from '../reducer';
import { getMentorAndIfRequested } from '../selectors/requests';

import MentorDetail from '../components/pages/mentorDetail';

class MentorDetailContainer extends React.Component {
    componentWillMount() {
        if (!this.props.mentor) {
            return this.props.redirectToSearch();
        }
    }

    render() {
        return (
            <MentorDetail 
                mentor={this.props.mentor}
                mentors = {this.props.mentors}
                sendRequest={this.props.sendRequest}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    if (!state.SearchMentors.get('mentors').size) {
        return {};
    } else {
        return {
            mentors: state.SearchMentors.get('mentors'),
            mentor: getMentorAndIfRequested(state, ownProps)
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendRequest: (message, mentorId) => {
            dispatch(Actions.requestsActions.sendRequest(message, mentorId));
        },
        redirectToSearch: () => {
            dispatch(replace('/search'));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MentorDetailContainer);
