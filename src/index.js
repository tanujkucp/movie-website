import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'


const Home = React.lazy(() => import('./views/pages/Home'));
const SignIn = React.lazy(() => import('./views/pages/SignIn'));
const Page404 = React.lazy(() => import('./views/pages/Page404'));
const MediaDetails = React.lazy(() => import('./views/pages/MediaDetails'));
const Bollywood = React.lazy(() => import('./views/pages/Bollywood'));
const Hollywood = React.lazy(() => import('./views/pages/Hollywood'));
const WebSeries= React.lazy(() => import('./views/pages/WebSeries'));
const Search= React.lazy(() => import('./views/pages/Search'));
const AdminUpload= React.lazy(() => import('./views/pages/AdminUpload'));

//todo add a loading indicator here
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

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

//todo If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
