import React from 'react';
import { connect } from 'react-redux';

class Register extends React.Component {
    render() {
        return(
            <div>Hello Register</div>
        )
    }
};

const mapStateToProps = state => {
    return {
        
    }
};

export default connect(mapStateToProps)(Register);