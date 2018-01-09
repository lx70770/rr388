import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Logo from '../../component/logo/logo.js';
import {List, InputItem, WingBlank, WhiteSpace, Button, Toast} from 'antd-mobile';

import './style.css';
import {login} from '../../redux/user.redux';

@connect(
    state => state.user,
    {login}
)
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
        };
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleRegister() {
        this.props.history.push('/register')
    }


    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }


    handleLogin() {
        this.props.login(this.state);
        setTimeout(() => {
            if (this.props.msg) {
                Toast.info(this.props.msg);
                setTimeout(() => {
                    Toast.hide();
                }, 1200)
            }
        }, 800);
    }

    render() {
        return (
            <div>
                {(this.props.redirectToFun) ? <Redirect to={this.props.redirectToFun}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem
                            placeholder='请输入用户名'
                            onChange={value => {
                                this.handleChange('user', value)
                            }}>用户名:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <List>
                        <InputItem
                            placeholder='请输入密码'
                            type="password"
                            onChange={value => {
                                this.handleChange('pwd', value)
                            }}>密码:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <Button
                        type="primary"
                        onClick={this.handleLogin}
                    >登录</Button>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
                    <span>还没账号 ？ <span className="login-register" onClick={this.handleRegister}>立即注册</span> </span>
                </WingBlank>
            </div>
        )
    }
}

export default Login;