import React from 'react';

import Header from './header';
import ThreadPreview from './threadPreview';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <Header 
                    numMessages={10}
                    numUnread={5}
                />
                <div className="thread-previews">
                    <ThreadPreview 
                        profile={this.props.profile}
                    />
                </div>
            </div>
        );
    }
}

export default Sidebar;
