import React from 'react';
import { Button } from 'reactstrap';

import ProfileTop from '../profile/profileTop';
import NewRequestField from './newRequestField';

class MentorDetail extends React.Component {
    state = {
        renderTextField: false
    }

    handleOpen = () => {
        this.setState({
            renderTextField: true
        });
    }

    handleClose = () => {
        this.setState({
            renderTextField: false
        });
    }

    render() {
        const {
            mentor
        } = this.props;

        const {
            renderTextField
        } = this.state;

        let key = 1;

        return (
            <div className="mentor-detail-container">
                <ProfileTop 
                    name={mentor.get('name')}
                />
                <div className="mentor-details">
                    <div className="about-major-heading heading">
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                        <h1>About Me</h1>
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
                            {
                                mentor.get('classes').map(className => {
                                    key += 1;
                                    return <li key={key}>{className}</li>
                                })
                            }
                        </ul>
                    </div>
                    {renderTextField && 
                        <NewRequestField 
                            mentorName={mentor.get('name')}
                            cancel={this.handleClose}
                        />
                    }
                    {!renderTextField && <Button color="primary" onClick={this.handleOpen}>Request</Button>}
                </div>
            </div>
        );
    }
}

export default MentorDetail;