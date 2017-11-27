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
import RegisterPendingContainer from './components/pages/register/registerPending';
import VerifyUserContainer from './container/verify';
import RegisterContainer from './container/register';
import ProfileContainer from './container/profile';
import SearchContainer from './container/search';
import CompleteRegistrationContainer from './container/completeRegistration';
import LoginContainer from './container/login';

import Authentication from './container/requireAuthentication';
import 'bootstrap/dist/css/bootstrap.css';
import 'main.scss';



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
                            <Route path="/completeRegistration" component={CompleteRegistrationContainer} />

                            <Route exact path="/profile" component={Authentication(ProfileContainer)} />
                            <Route exact path="/search" component={Authentication(SearchContainer)} />
                            <Route path="/verify" component={Authentication(VerifyUserContainer)} />

                            <Redirect to="/"/>
                        </Switch>
                    </div>
                </ConnectedRouter>
            </Provider>
        )
    }
}


render(
    <App/>,
    document.getElementById('mount')
);
