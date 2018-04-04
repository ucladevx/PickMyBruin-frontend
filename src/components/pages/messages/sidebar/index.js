import React from 'react';

import Header from './header';
import ThreadPreview from './threadPreview';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <Header 
                    numMessages={this.props.count}
                    numUnread={5}
                />
                <div className="thread-previews">
                    {this.props.threads.map(thread => {
                        return (
                            <ThreadPreview 
                                self={this.props.profile}
                                thread={thread}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Sidebar;
