import React from 'react';
import {Provider} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {render} from 'react-dom';

import {store, history} from './reducer';

import Navbar from 'view/navbar';
import Home from './components/home';
import About from 'container/about';
import Register from 'container/register';

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
                            <Route path="/register" component={Register}/>
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
