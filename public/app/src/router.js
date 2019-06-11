import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import _async from './utils/async'
const Home = _async(() => import('./view/home.js'));
const Index = _async(() => import('./view/index.js'));
const Login = _async(() => import('./view/member/login'));
const Reg = _async(() => import('./view/member/reg'));
const summary = _async(() => import('./view/summary'));
const People = _async(() => import('./view/management/people'));
const Duties = _async(() => import('./view/management/duties'));
const article = _async(() => import('./view/management/article'));
const articleUp = _async(() => import('./view/management/articleUp'));
const goods = _async(() => import('./view/management/goods'));
const options = _async(() => import('./view/management/options'));

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path="/" render={() =>
                <Home>
                    <Route exact path="/" render={() => (
                        <Redirect to="/home/summary" />
                    )} />
                    <Route path="/home" render={() =>
                        <Index>
                            <Route path="/home/summary" component={summary}></Route>
                            <Route path="/home/people" component={People}></Route>
                            <Route path="/home/duties" component={Duties}></Route>
                            <Route path="/home/articleUp" component={articleUp}></Route>
                            <Route path="/home/article" component={article}></Route>
                            <Route path="/home/goods" component={goods}></Route>
                            <Route path="/home/options" component={options}></Route>
                        </Index>
                    }>
                    </Route>
                </Home>
            }></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/reg" component={Reg}></Route>

            {/* <Route path="/menu" render={() =>
                <Home>
                    <Route path="/menu/item1/:id" component={Index}></Route>
                </Home>
            }></Route> */}
        </Switch>
    </HashRouter>
);

export default BasicRoute;