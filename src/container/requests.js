import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../reducer';
import Requests from '../components/pages/requests';

class RequestsContainer extends React.Component {
    componentsDidMount() {
        this.props.getRequests();
    }

    render() {
        return (
            <Requests 
    			requests={this.props.requests}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        requests: state.Requests.get('requests')
        // profile_id: state.Profile.get('id')
        // have to check if mentee id is me, then i requested for someone. if mentor id is me, then someone requested me!
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getRequests: () => {
            dispatch(Actions.requestsActions.getRequests());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsContainer);
 