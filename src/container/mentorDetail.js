import React from 'react';
import { connect } from 'react-redux';

import MentorDetail from '../components/pages/mentorDetail';

class MentorDetailContainer extends React.Component {
    render() {
        return (
            <MentorDetail 
                mentor={this.props.mentor}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const mentors = state.SearchMentors.get('mentors');
    return {
         mentor: mentors.filter(mentor => mentor.get('id') == ownProps.match.params.mentorId).get(0)
    }
}

export default connect(mapStateToProps, null)(MentorDetailContainer);