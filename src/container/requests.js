import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../reducer';
import Requests from '../components/pages/requests';

class RequestsContainer extends React.Component {
    render() {
        return (
            <Requests 
    			requests={this.props.requests}
    			handleRequests={this.props.handleRequests}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        requests: state.Requests.get('requests')
    };
}

const mapDispatchToProps = dispatch => {
    return {
        handleRequests: () => {
            dispatch(Actions.requestsActions.handleRequests());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsContainer);
