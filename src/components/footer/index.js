import React from "react";
import { withRouter } from "react-router-dom";

import BquestLogo from '../../../images/loginPage/white-bquest-logo.svg.inline';

class Footer extends React.Component {
    render() {
        return (
            <div className="footer-container">
                <div className="link-logo">
                    <div className="inner-logo" dangerouslySetInnerHTML={{__html: BquestLogo}} />
                    <p onClick={() => this.props.history.push("/search")}>BQUEST</p>
                </div>
                <div className="between-link">
                    <p>/</p>
                </div>
                <div className="link-privacy">
                    <p onClick={() => this.props.history.push("/privacy")}>Privacy Policy</p>
                </div>
                <div className="between-link">
                    <p>/</p>
                </div>
                <div className="link-about">
                    <p onClick={() => this.props.history.push("/about")}>About Us</p>
                </div>
            </div>
        );
    }
}

export default withRouter(Footer);
