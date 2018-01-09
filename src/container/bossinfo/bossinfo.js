import React from 'react';
import {connect} from 'react-redux';

import {NavBar, List, InputItem, WhiteSpace, WingBlank, TextareaItem, Button} from 'antd-mobile';

import {update} from '../../redux/user.redux';
import AvatarSelect from "../../component/avatar-selector/avatar-selector";

@connect(
    state => state.user,
    {update}
)
class BossInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            avatar: '',
            company: '',
            money: '',
            desc: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.selectAvatar = this.selectAvatar.bind(this);
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    selectAvatar(imgname) {
        this.setState({
            avatar: imgname
        })
    }

    render() {
        return (
            <div>
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <WingBlank>
                    <AvatarSelect selectAvatar={this.selectAvatar}/>
                    <WhiteSpace/><WhiteSpace/>
                    <List>
                        <InputItem
                            placeholder='输入职位名称'
                            onChange={(v) => this.handleChange('title', v)}
                        >招聘职位:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/>
                    <List>
                        <InputItem
                            placeholder='输入公司名称'
                            onChange={(v) => this.handleChange('company', v)}
                        >公司名称:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/>
                    <List>
                        <InputItem
                            placeholder='输入薪资， 例: 5000~10000'
                            onChange={(v) => this.handleChange('money', v)}
                        >职位薪资:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/>
                    <List>
                        <TextareaItem
                            onChange={(v) => this.handleChange('desc', v)}
                            rows={3}
                            autoHeight
                            title="职位要求:"
                            placeholder='输入职位要求,可以多行输入'
                        />
                    </List>

                    <Button
                        type="primary"
                        onClick={() => {
                            this.props.update(this.state)
                        }}
                    >保存</Button>
                </WingBlank>
            </div>
        )
    }
}

export default BossInfo;