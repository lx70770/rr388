import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import reducer from './reducer';
// import './config';
import 'antd-mobile/dist/antd-mobile.less';

import AuthRoute from './component/authRoute/authRoute';
import Register from './container/register/register';
import Login from './container/login/login';
import BossInfo from './container/bossinfo/bossinfo';
import GeniusInfo from "./container/geniusinfo/geniusinfo";
import Dashboard from './component/Dashboard/dashboard';
import Chat from "./component/chat/chat";

/** @namespace window.devToolsExtension */
const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
));


//boss页面  牛人页面  个人中心 消息页面  一个四个页面
ReactDOM.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                {/*总路由放在这里*/}
                <div>
                    <AuthRoute/>
                    <Switch>
                        <Route path="/bossinfo" component={BossInfo}/>
                        <Route path="/geniusinfo" component={GeniusInfo}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/chat/:user" component={Chat}/>
                        <Route component={Dashboard}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ), document.getElementById('root'));

