import React from 'react';
import { connect } from 'react-redux';

class ProfileContainer extends React.Component {
    render() {
        return (
            <div>
                Profile Container
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);