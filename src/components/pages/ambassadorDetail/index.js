import React from 'react';

import ColumnRight from './columnRight';
import ColumnLeft from './columnLeft';

class AmbassadorDetail extends React.Component {
    render() {
        console.log(this.props);
        const ambassador = this.props.ambassador;
        return (
            <div className="ambassador-detail">
                <div className="top-bar">
                    <span><i className="fa fa-arrow-left"></i> Search</span>
                </div>
                <div className="content">
                    <ColumnLeft
                        profile={ambassador.get('user')}
                        mentor={ambassador.get('mentor')}
                    />
                    <ColumnRight 
                        bio={ambassador.getIn(['mentor', 'bio'])}
                    />
                </div>
            </div>
        );
    }
}

export default AmbassadorDetail;