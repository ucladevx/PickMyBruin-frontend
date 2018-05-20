import React from 'react';

import ColumnRight from './columnRight';
import ColumnLeft from './columnLeft';

class AmbassadorDetail extends React.Component {
    render() {
        const ambassador = this.props.ambassador;
        return (
            <div className="ambassador-detail">
                <div className="top-bar">
                    <span onClick={this.props.goBack}><i className="fa fa-arrow-left"></i> Search</span>
                </div>
                <div className="content">
                    <ColumnLeft
                        profile={ambassador.get('user')}
                        mentor={ambassador.get('mentor')}
                    />
                    <ColumnRight 
                        mentor={ambassador.get('mentor')}
                    />
                </div>
            </div>
        );
    }
}

export default AmbassadorDetail;