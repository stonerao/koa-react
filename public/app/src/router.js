import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import _async from './utils/async'
const Home = _async(() => import('./view/home.js'));
const Index = _async(() => import('./view/index.js'));
const Login = _async(() => import('./view/member/login'));
const Reg = _async(() => import('./view/member/reg'));
const Topo = _async(() => import('./view/webgl/topo'));
const TopoEdit = _async(() => import('./view/webgl/topo-edit'));

const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route path="/" render={() =>
                <Home>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/reg" component={Reg}></Route>
                    <Route path="/home" render={() =>
                        <Index>
                            <Route path="/home/topo" component={Topo}></Route>
                            <Route path="/home/topoEdit" component={TopoEdit}></Route>
                        </Index>
                    }>
                    </Route>
                </Home>
            }></Route>

            {/* <Route path="/menu" render={() =>
                <Home>
                    <Route path="/menu/item1/:id" component={Index}></Route>
                </Home>
            }></Route> */}
        </Switch>
    </HashRouter>
);

export default BasicRoute;