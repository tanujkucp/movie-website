import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'

import Home from './views/pages/Home';
import SignIn from './views/pages/SignIn';
import Page404 from './views/pages/Page404';
import MediaDetails from './views/pages/MediaDetails';
import Bollywood from './views/pages/Bollywood';
import Hollywood from './views/pages/Hollywood';
import WebSeries from './views/pages/WebSeries';
import Search from './views/pages/Search';
import AdminUpload from './views/pages/AdminUpload';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

//todo add other routes
const routing = (
    <Router>
        <React.Suspense fallback={loading()}>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/adminLogin" component={SignIn}/>
                <Route path="/bollywood" component={Bollywood}/>
                <Route path="/hollywood" component={Hollywood}/>
                <Route path="/webseries" component={WebSeries}/>
                <Route path="/search" component={Search}/>
                <Route path="/adminUpload" component={AdminUpload}/>
                <Route path="/m/:id" component={MediaDetails} />
                <Route component={Page404}/>
            </Switch>
        </React.Suspense>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
