import React from 'react';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {Card, WingBlank, WhiteSpace} from 'antd-mobile';

@withRouter
class UserCard extends React.Component{
    static propTypes = {
        userlist: propTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(v) {
        this.props.history.push(`/chat/${v._id}`);
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                <WhiteSpace/>
                {this.props.userlist.map(v => (
                    v.avatar ? <div key={v._id}>
                        <Card
                            onClick={() => {
                                this.handlePress(v)
                            }}
                        >
                            <Header
                                title = {v.user}
                                thumb = {require(`../images/${v.avatar}.png`)}
                                extra = {<span>{v.title}</span>}
                            ></Header>
                            <Body>
                            {v.type==='boss'?<div>公司:{v.company}</div>:null}
                            {v.desc.split('\n').map(v => (
                                <div key={v}>介绍:{v}</div>
                            ))}
                            {v.type==='boss'?<div>薪资:{v.money}</div>:null}
                            </Body>
                        </Card>
                        <WhiteSpace/>
                    </div> : null
                ))}
            </WingBlank>
        )
    }
}
export default UserCard;