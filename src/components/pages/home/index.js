import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="landing-screen">
                    <section className="top-bar">
                        <div className="logo">BQuest</div>
                        <div className="nav-buttons">
                            <div>About DevX</div>
                            <div>How It Works</div>
                        </div>
                    </section>
                </div>
                <div className="explanation">
                    How it works
                </div>
            </div>
        );
    }
}

export default Home;