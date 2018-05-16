import { createSelector } from 'reselect';

/*
Taken from
https://medium.com/@parkerdan/react-reselect-and-redux-b34017f8194c
*/

const getAmbassador = (state, props) => {
    console.log(state, props);
    const mentorId = Number(props.match.params.mentorId);
    const ambassadorById = state.SearchMentors.get('mentors').find(ambassador => ambassador.getIn(['mentor', 'id']) === mentorId);
    return ambassadorById;
}

export const getAmbassadorState = createSelector(
    [getAmbassador],
    ambassador => ambassador
);