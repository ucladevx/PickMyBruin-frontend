import 'whatwg-fetch';
import 'babel-polyfill';

import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {render} from 'react-dom';

import {store, history} from './reducer';

import Navbar from 'view/navbar';
import Home from './components/home';
import RegisterPendingContainer from './components/register/registerPending';
import VerifyUserContainer from './container/verify';
import RegisterContainer from './container/register';
import ProfileContainer from './container/profile';
import CompleteRegistrationContainer from './container/completeRegistration';
import About from 'container/about';

import 'bootstrap/dist/css/bootstrap.css';
import 'main.scss';

class App extends React.Component {
	render() {
		return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/profile" component={ProfileContainer} />
                            <Route exact path="/register" component={RegisterContainer}/>
                            <Route path="/register/pending" component={RegisterPendingContainer} />
                            <Route path="/verify_user" component={VerifyUserContainer} />
                            <Route path="/completeRegistration" component={CompleteRegistrationContainer} />
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
