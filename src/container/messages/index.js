import React from 'react';
import { connect } from 'react-redux';

import { Actions } from 'reducer';

import Input from './input';
import Sidebar from './sidebar';
import ThreadView from './threadView';
import NavBar from 'components/navbar';

class MessagesContainer extends React.Component {
    render() {
        return (
            <div className="messages-container">
                <NavBar />
                <Sidebar />
                <div className="threadview-input-container">
                    <ThreadView />
                    <Input />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {};
}

const mapDispatchToProps = dispatch => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);

