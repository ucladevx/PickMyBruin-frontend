import React from 'react';

import TopBar from './topBar';
class Home extends React.Component {
    render() {
        return (
            <div className="home-container">
                <div className="landing-screen">
                    <TopBar />
                </div>
                <div className="explanation">
                    How it works
                </div>
            </div>
        );
    }
}

export default Home;