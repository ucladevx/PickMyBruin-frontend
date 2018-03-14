import React from 'react';

import Header from './header';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <Header 
                    numMessages={10}
                    numUnread={5}
                />
            </div>
        );
    }
}

export default Sidebar;
