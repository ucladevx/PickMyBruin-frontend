import React from 'react';
import { connect } from 'react-redux';

import Register from '../components/register';

class RegisterContainer extends React.Component {
    render() {
        return(
            <Register />
        )
    }
};

const mapStateToProps = state => {
    return {
        
    }
};

export default connect(mapStateToProps)(RegisterContainer);