import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import _async from './utils/async'
const Home = _async(() => import('./view/home.js'));
const Index = _async(() => import('./view/index.js'));
const Login = _async(() => import('./view/member/login'));
const Reg = _async(() => import('./view/member/reg'));
const summary = _async(() => import('./view/summary'));
const TopoEdit = _async(() => import('./view/webgl/topo-edit'));
const MapCom = _async(() => import('./view/webgl/map'));

const BasicRoute = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" render={() =>
                <Home>
                    <Route exact path="/" render={() => (
                        <Redirect to="/home/summary" />
                    )} />
                    <Route path="/home" render={() =>
                        <Index>
                            <Route path="/home/summary" component={summary}></Route>
                            <Route path="/home/map" component={MapCom}></Route>
                            <Route path="/home/topoEdit" component={TopoEdit}></Route>
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
    </BrowserRouter>
);

export default BasicRoute;