import React from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import PropsTypes from 'prop-types';

import './navLink.css';

@withRouter
@connect(
    state => state.chat,
    null
)
class NavLinkBar extends React.Component {

    render() {
        const navList = this.props.data.filter(v => !v.hide);
        const pathName = this.props.location.pathname;
        return (
            <div className="nav-bar-bottom">
                <TabBar>
                    {navList.map((v) =>
                        <TabBar.Item
                            badge={v.path==='/msg'?this.props.unread:0}
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                            selected={pathName === v.path}
                            onPress={() => {
                                this.props.history.push(v.path);
                            }}
                        />
                    )}
                </TabBar>
            </div>
        )
    }
}

export default NavLinkBar;

NavLinkBar.PropTypes = {
    data: PropsTypes.array.isRequired
};