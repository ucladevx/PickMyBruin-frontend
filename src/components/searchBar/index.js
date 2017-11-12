import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import majors from '../../majors';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.majors = majors
    }

    state = {
        dataSource: [],
    };

    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AutoComplete
                        hintText="Type anything"
                        dataSource={this.majors}
                        filter={AutoComplete.caseInsensitiveFilter}
                    />
                    <AutoComplete
                        hintText="Type anything"
                        dataSource={this.state.dataSource}
                        onUpdateInput={this.handleUpdateInput}
                        floatingLabelText="Full width"
                        fullWidth={true}
                    />
                </div>
            </ MuiThemeProvider>
        );
    }
}

export default Search;