import { createSelector } from 'reselect';

const requestsSelector = state => state.Requests;
const mentorSelector = (state, props) => {
    if (!state.SearchMentors.get('mentors').size){
        return null;
    }

    return state.SearchMentors.get('mentors').filter(mentorProfile => mentorProfile.getIn(['mentor','id']) == props.match.params.mentorId).get(0)
}

export const getMentorAndIfRequested = createSelector(
    [requestsSelector, mentorSelector],
    (requests, mentorProfile) => {
        if (!requests.size && mentorProfile) {
            return null;
        }

        const index = requests.get('requests').findIndex(request => Number(request.getIn(['mentor', 'id'])) === Number(mentorProfile.getIn(['mentor','id'])));
        return {
            profile: mentorProfile,
            canNotRequest: index !== -1
        }
    }
)
