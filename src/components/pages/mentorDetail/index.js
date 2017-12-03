import React from 'react';
import { Button } from 'reactstrap';

import ProfileTop from '../profile/profileTop';

class MentorDetail extends React.Component {

    onRequest = () => {
        alert("dope!");
    }

    render() {
        const {
            mentor
        } = this.props;

        return (
            <div className="mentor-detail-container">
                <ProfileTop 
                    name={mentor.get('name')}
                />
                <div className="mentor-details">
                    <div className="about-major-heading heading">
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                        <h1>About My Major</h1>
                    </div>
                    <div className="about-major">
                        <p>{mentor.get('bio')}</p>
                    </div>
                    <div className="heading my-classes-heading">
                        <i className="fa fa-book" aria-hidden="true"></i>
                        <h1>My Classes</h1>
                    </div>
                    <div className="my-classes">
                        <ul>
                            {mentor.get('classes').map(className => <li>{className}</li>)}
                        </ul>
                    </div>
                    <Button color="primary" onClick={this.onRequest}>Request</Button>
                </div>
            </div>
        );
    }
}

export default MentorDetail;