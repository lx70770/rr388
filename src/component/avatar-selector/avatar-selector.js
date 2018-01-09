import React from 'react';
import {Grid, TextareaItem, WhiteSpace} from 'antd-mobile';

class AvatarSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            icon: ''
        }
    }

    render() {
        const avatarList = 'boy, man, girl, woman, chick, hedgehog, hippopotamus, koala, lemur, bull, pig, tiger, whale, crab, zebra'
            .split(', ')
            .map((v) => ({
                icon: require(`../images/${v}.png`),
                text: v
            }));

        return (
            <div>
                <WhiteSpace/><WhiteSpace/><WhiteSpace/>
                {this.state.icon
                    ?
                    (<div>
                        <span>您已经选择头像:</span>
                        <img src={this.state.icon} alt=""/>
                    </div>)
                    : <div>
                        <span>请选择头像</span>
                        <img src={require(`../images/initAvatar.png`)} alt="请选择头像"/>
                    </div>}
                <WhiteSpace/><WhiteSpace/><WhiteSpace/>
                <Grid
                    data={avatarList}
                    columnNum={5}
                    onClick={elm => {
                        this.setState(elm);
                        this.props.selectAvatar(elm.text);
                    }}
                />
            </div>
        )
    }
}

export default AvatarSelect;