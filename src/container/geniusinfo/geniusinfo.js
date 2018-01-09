import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {NavBar, List, InputItem, WhiteSpace, WingBlank, TextareaItem, Button} from 'antd-mobile';

import {update} from '../../redux/user.redux';
import AvatarSelect from "../../component/avatar-selector/avatar-selector";

@connect(
    state => state.user,
    {update}
)
class GeniusInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            avatar: ''
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
                {this.props.redirectToFun==='boss'?<Redirect to="/boss"/>:null}
                <NavBar mode="dark">Genius完善信息页</NavBar>
                <WingBlank>
                    <AvatarSelect selectAvatar={this.selectAvatar}/>
                    <WhiteSpace/><WhiteSpace/>
                    <List>
                        <InputItem
                            placeholder='输入职位名称'
                            onChange={(v) => this.handleChange('title', v)}
                        >应聘职位:</InputItem>
                    </List>
                    <WhiteSpace/><WhiteSpace/>

                    <List>
                        <TextareaItem
                            onChange={(v) => this.handleChange('desc', v)}
                            rows={4}
                            autoHeight
                            title="个人简介:"
                            placeholder='输入个人简介,可以多行输入'
                        />
                    </List>
                    <WhiteSpace/><WhiteSpace/><WhiteSpace/><WhiteSpace/>
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

export default GeniusInfo;