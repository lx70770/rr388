import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import browserCookie from 'browser-cookies';
import {Result, List, WhiteSpace, Modal} from 'antd-mobile';

import {logoutSubmit} from '../../redux/user.redux';

@connect(
    state => state.user,
    {logoutSubmit}
)
class UserCenter extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        Modal.alert('注销1', '确定退出吗？', [
            {text: '取消', onPress: () => console.log('取消')},
            {text: '确定', onPress: () => {
                browserCookie.erase('userid');
                this.props.logoutSubmit();
            }}
        ]);
    }

    render() {
        const props = this.props;
        const avatar = this.props.avatar;
        const Item = List.Item;
        const Brief = Item.Brief;
        if(props.redirectToFun==='/login'){
            return <Redirect to={props.redirectToFun}/>
        }
        return avatar?(
            <div>
                <Result
                    img={<img src={require(`../images/${avatar}.png`)} style={{width:50}}/>}
                    title={this.props.user}
                    message={props.type==='boss'?props.company:null}
                />

                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        {props.money?<Brief>薪资:{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace/>
                <WhiteSpace/>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ):null

    }
}

export default UserCenter;