/*第三方库引入*/
import React from 'react';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/logo/logo.js';
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile';
import {connect} from 'react-redux';

/*reducer引入*/
import {register} from "../../redux/user.redux"


/*该修饰器需要使用一个babel-plugin-transform-decorators-legacy的插件*/
@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatPwd: '',
            type: 'genius',
            redirectTo: false
        };

        //函数绑定
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        this.props.history.push('/login')
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleRegister() {
        this.props.register(this.state);
        setTimeout(() => {
            if (this.props.msg) {
                Toast.info(this.props.msg);
                setTimeout(() => {
                    Toast.hide();
                    if (this.props.redirectToFun) {
                        this.setState({redirectTo: true})
                    }
                }, 1200)
            }
        }, 800);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.state.redirectTo ? <Redirect to={this.props.redirectToFun}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem
                            placeholder="请输入您的用户名"
                                onChange={(v) => this.handleChange('user', v)}
                        >用户名:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <List>
                        <InputItem
                            placeholder="请输入您的密码"
                                type="password"
                            onChange={(v) => this.handleChange('pwd', v)}
                        >密码:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <List>
                        <InputItem
                            placeholder="请再次确认您的密码"
                                type="password"
                            onChange={(v) => this.handleChange('repeatPwd', v)}
                        >确认密码:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <span className="">请选择你的角色</span>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <List>
                        <RadioItem
                            checked={this.state.type === 'genius'}
                            onChange={(v) => this.handleChange('type', 'genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={(v) => this.handleChange('type', 'boss')}
                        >
                            BOSS
                        </RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button
                        type="primary"
                        onClick={this.handleRegister}
                    >注册</Button>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <WhiteSpace/><WhiteSpace/>
                    <span>已有账号 ？ <span className="login-register" onClick={this.handleLogin}>现在登录</span> </span>
                </WingBlank>
            </div>
        )
    }
}

export default Register;