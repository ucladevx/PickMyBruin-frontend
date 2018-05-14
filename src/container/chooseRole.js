import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { Actions } from 'reducer';
import ChooseRole from 'components/pages/chooseRole';

class ChooseRoleContainer extends React.Component {
    render() {
        return(
            <ChooseRole 
                beAmbassador={this.props.beAmbassador}
                redirectToProfile={this.props.redirectToProfile}
            />
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {
        beAmbassador: () => {
            dispatch(Actions.profileActions.updateMentorStatus(true));
            dispatch(replace("/profile"));
        },
        redirectToProfile: () => {
            dispatch(replace("/profile"));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRoleContainer);
