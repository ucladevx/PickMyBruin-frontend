import { createSelector } from 'reselect';

const requestsSelector = state => state.Requests;
const mentorSelector = (state, props) => {
    return state.SearchMentors.get('mentors').filter(mentorProfile => mentorProfile.getIn(['mentor','id']) == props.match.params.mentorId).get(0)
}

export const getMentorAndIfRequested = createSelector(
    [requestsSelector, mentorSelector],
    (requests, mentorProfile) => {
        const index = requests.get('requests').findIndex(request => Number(request.getIn(['mentor', 'id'])) === mentorProfile.getIn(['mentor','id']));
        return {
            profile: mentorProfile,
            hasRequested: index !== -1
        }
    }
)
