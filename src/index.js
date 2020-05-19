import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import Home from './views/pages/Home';

const Page404 = React.lazy(() => import('./views/pages/Page404'));
const MediaDetails = React.lazy(() => import('./views/pages/MediaDetails'));
const MediaDetails18 = React.lazy(() => import('./views/pages/MediaDetails18+'));
const Bollywood = React.lazy(() => import('./views/pages/Bollywood'));
const Hollywood = React.lazy(() => import('./views/pages/Hollywood'));
const WebSeries = React.lazy(() => import('./views/pages/WebSeries'));
const PagePlus18 = React.lazy(() => import('./views/pages/PagePlus18'));
const Search = React.lazy(() => import('./views/pages/Search'));

const loading = () => <LinearProgress variant="query" style={{width: '100%'}} color="secondary"/>;

const routing = (
    <Router>
        <React.Suspense fallback={loading()}>
            <Switch>
                <Route exact path="/" component={Home}/>

                <Route exact path="/bollywood" component={Bollywood}/>
                <Route exact path="/hollywood" component={Hollywood}/>
                <Route exact path="/webseries" component={WebSeries}/>
                <Route exact path="/adult" component={PagePlus18}/>
                <Route exact path="/search" component={Search}/>
                <Route path="/m/:id" component={MediaDetails}/>
                <Route path="/p/:id" component={MediaDetails18}/>
                <Route component={Page404}/>
            </Switch>
        </React.Suspense>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
