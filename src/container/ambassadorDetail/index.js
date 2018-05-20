import React from 'react';
import { connect } from 'react-redux';
import { replace, goBack } from 'react-router-redux';

import { Actions } from 'reducer';
import { getAmbassadorState } from 'selectors/ambassadors';

import AmbassadorDetail from 'components/pages/ambassadorDetail';
import NavBar from 'components/navbar';
import Sidebar from './sidebar';

class AmbassadorDetailContainer extends React.Component {
    render() {
        return (
            <div className="ambassador-detail-container">
                <div className="ambassador-detail-wrapper">
                    <Sidebar />
                    <AmbassadorDetail 
                        ambassador={this.props.ambassador}
                        goBack={this.props.goBack}
                        sendMessage={this.props.sendMessage}
                    />
                </div>
                <NavBar />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ambassador: getAmbassadorState(state, ownProps),
    };
}

const mapDispatchToProps = dispatch => {
    return {
        goBack: () => {
            dispatch(goBack());
        },
        sendMessage: (messageText, profileId) => {
            dispatch(Actions.messagesActions.sendMessage(messageText, profileId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AmbassadorDetailContainer);