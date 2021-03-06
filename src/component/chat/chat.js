import React from 'react';
import {List, InputItem, NavBar, Icon} from 'antd-mobile';
import {connect} from 'react-redux';

import {sendMsg, getMsgList, recvMsg} from '../../redux/chat.redux';

import './chat.css';
import {getChatId} from '../../util';


@connect(
    state => state,
    {sendMsg, getMsgList, recvMsg}
)
class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    handleSubmit() {
        window.scrollTo(0, 0);
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({
            text: ''
        });

    }

    render() {
        console.log(this.props.chat);
        const userid = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        console.log(users);
        if (!users[userid]) {
            return null;
        }
        const chatid = getChatId(userid, this.props.user._id);
        const chatmsg = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
        return (
            <div id="chat-page">
                <div className="chat-page-header">
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left"/>}
                        onLeftClick={() => {
                            this.props.history.goBack();
                        }}
                    >{users[userid].name}</NavBar>
                </div>

                <div className="chat-page-content">
                    <div className="chat-page-room"></div>
                    {chatmsg.map(v => {
                        const avatar = require(`../images/${users[v.from].avatar}.png`);
                        return v.from === userid ? (
                            <List key={v._id}>
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                        ) : (
                            <List key={v._id}>
                                <Item
                                    extra={<img src={avatar} alt=""/>}
                                    className="chat-me"
                                >{v.content}</Item>
                            </List>
                        )
                    })}
                    <div className="chat-page-room"></div>
                </div>

                <div className="fixed-bottom">
                    <List>
                        <InputItem
                            placeholder='请输入信息1'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={<span onClick={this.handleSubmit}>发送</span>}
                        />
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;