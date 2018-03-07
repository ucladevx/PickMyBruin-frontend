import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';
import Sidebar from 'components/pages/messages/sidebar';

class SidebarContainer extends React.Component {
    render() {
        return (
            <Sidebar />
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);

