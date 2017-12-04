import { createSelector } from 'reselect';

const requestsSelector = state => state.Requests;
const mentorSelector = (state, props) => {
    return state.SearchMentors.get('mentors').filter(mentor => mentor.get('id') == props.match.params.mentorId).get(0)
}

export const getMentorAndIfRequested = createSelector(
    [requestsSelector, mentorSelector],
    (requests, mentor) => {
        const index = requests.get('requests').findIndex(request => Number(request.getIn(['mentor', 'id'])) === mentor.get('id'));
        return {
            profile: mentor,
            hasRequested: index !== -1
        }
    }
)
