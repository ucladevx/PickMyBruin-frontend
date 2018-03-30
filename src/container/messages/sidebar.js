import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import Sidebar from 'components/pages/messages/sidebar';

class SidebarContainer extends React.Component {
    render() {
        return (
            <Sidebar 
                profile={this.props.profile}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        profile: state.Profile
    };
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);

