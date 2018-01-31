import React from 'react';
import { connect } from 'react-redux';
import { Actions } from '../reducer';
import Requests from '../components/pages/requests';

class RequestsContainer extends React.Component {
    componentDidMount() {
        if (!(this.props.requests.size)) {
            this.props.getRequests();
        }
    }

    render() {
        return (
            <Requests
                requests={this.props.requests}
                profile={this.props.profile}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        requests: state.Requests.get('requests'),
        profile: state.Profile.get('user')
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