import React from 'react';
import {connect} from 'react-redux';
import {Switch, Route} from 'react-router-dom';

import {NavBar} from 'antd-mobile';
import NavLinkBar from "../navLink/navLink";

import Boss from '../boss/boss';
import Genius from '../Genius/genius';
import Msg from '../msg/msg';
import UserCenter from '../user-center/user-center';
import {getMsgList, recvMsg} from '../../redux/chat.redux';

import './dashboard.css';

@connect(
    state => state,
    {getMsgList, recvMsg}
)
class DashBoard extends React.Component {

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    render() {
        const user = this.props.user;
        const {pathname} = this.props.location;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: UserCenter
            }
        ];
        return (
            <div>
                <div className="nav-bar-top">
                    <NavBar mode='dark'>{navList.find(value => value.path === pathname).title}</NavBar>
                </div>
                <div className="content-wrapper">
                    <Switch>
                        {navList.map(v => {
                            return <Route key={v.path} path={v.path} component={v.component}/>
                        })}
                    </Switch>
                </div>
                <NavLinkBar data={navList}/>
            </div>
        )
    }
}

export default DashBoard;
