import 'whatwg-fetch';
import 'babel-polyfill';

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import {render} from 'react-dom';
import {store, history} from './reducer';

import HomeContainer from './container/home';
import VerifyUserContainer from './container/verify';
import RegisterContainer from './container/register';
import MultipleProfileContainer from './container/multipleProfile';
import ProfileContainer from './container/profile';
import SearchContainer from './container/search';
import ambassadorDetailContainer from 'container/ambassadorDetail';
import CompleteRegistrationContainer from './container/completeRegistration';
import ChooseRoleContainer from 'container/ChooseRole';
import LoginContainer from './container/login';
//import RequestsContainer from './container/requests';
import MessagesContainer from 'container/messages';
import Authentication from './container/requireAuthentication';
import RegisterPendingContainer from './components/pages/register/registerPending';

import 'bootstrap/dist/css/bootstrap.css';
import './main.scss';

// google analytics
import withTracker from './container/analytics.js';

class PageTracker extends React.Component {
    render() { return null; }
}

if (module.hot) {
    module.hot.accept();
}

class App extends React.Component {
	render() {
		return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <NotificationsSystem theme={theme} />
                        <Switch>
                            <Route exact path="/" component={HomeContainer}/>
                            <Route exact path="/login" component={LoginContainer}/>
                            <Route exact path="/register" component={RegisterContainer}/>
                            <Route path="/register/pending" component={RegisterPendingContainer} />
                            <Route path="/verify" component={VerifyUserContainer} />
                            <Route path="/completeRegistration" component={CompleteRegistrationContainer} />

                            <Route exact path="/chooseRole" component={Authentication(ChooseRoleContainer)} />
                            <Route exact path="/profile/:page" component={Authentication(MultipleProfileContainer)} />
                            {/*<Route exact path="/profile" component={Authentication(ProfileContainer)} />*/}
                            <Route exact path="/search" component={Authentication(SearchContainer)} />
                            <Route exact path="/messages" component={Authentication(MessagesContainer)}/>
                            <Route exact path="/messages/:profileId" component={Authentication(MessagesContainer)} />
                            <Route exact path="/ambassadors/:mentorId" component={Authentication(ambassadorDetailContainer)} />
                            <Redirect to="/"/>
                        </Switch>
                        <Route path="/" component={withTracker(PageTracker)} />
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}

render(
    <App />,
    document.getElementById('mount')
);
