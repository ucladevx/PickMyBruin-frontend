import React from 'react';

import ColumnRight from './columnRight';
import ColumnLeft from './columnLeft';
import Modal from 'components/modal';

class AmbassadorDetail extends React.Component {
    state = {
        showModal: false,
        messageText: ''
    }

    onClick = () => {
        this.setState(prev => ({
            showModal: !prev.showModal
        }));
    }

    onCloseModal = () => {
        this.setState({
            showModal: false
        });
    }

    sendMessage = e => {
        e.preventDefault();
        this.props.sendMessage(this.state.messageText, this.props.ambassador.getIn(['user', 'id']));
    }

    onChange = e => {
        this.setState({
            messageText: e.target.value
        })
    }

    render() {
        const ambassador = this.props.ambassador;
        return (
            <div className="ambassador-detail">
                {this.state.showModal ? 
                    <Modal 
                        closeModal={this.onCloseModal}>
                        <p>Introduce yourself...</p>
                        <p>Ask them a question...</p>
                        <p>Request a meetup!</p>
                        <form onSubmit={this.sendMessage}>
                            <input value={this.state.messageText} type="text" placeholder="write something.." onChange={this.onChange}/>
                        </form>
                    </Modal>     : null}
                <div className="top-bar">
                    <span onClick={this.props.goBack}><i className="fa fa-arrow-left"></i> Search</span>
                </div>
                <div className="content">
                    <ColumnLeft
                        profile={ambassador.get('user')}
                        mentor={ambassador.get('mentor')}
                        onClick={this.onClick}
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