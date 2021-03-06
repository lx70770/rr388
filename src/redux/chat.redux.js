import axios from 'axios';
import io from 'socket.io-client';

const socket = io('ws://localhost:9093');

//获取聊天列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';

const initState = {
    chatmsg: [],
    users: {},
    unread: 0
};

export function chat(state = initState, action) {
    switch (action.type) {
        case (MSG_LIST):
            return {...state,users:action.payload.users, chatmsg:action.payload.msgs, unread: action.payload.msgs.filter(v=>!v.read&&v.to===action.payload.userid).length};
        case (MSG_RECV):
            return {...state, chatmsg: [...state.chatmsg,action.payload],unread: state.unread+1};
        case (MSG_READ):
            return {};
        default:
            return state;
    }
}

const msgList = (msgs, users, userid) => {
    return {type: MSG_LIST, payload: {msgs, users, userid}}
};

function msgRecv(msg) {
    return {type: MSG_RECV, payload:msg}
}

export function recvMsg() {
    return dispatch => {
         socket.on('recvmsg', (data) => {
             dispatch(msgRecv(data));
         })
    }
}

export function sendMsg({from, to, msg}) {
    return dispatch => {
        socket.emit('sendmsg', {from, to, msg});
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsgList')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id;
                    dispatch(msgList(res.data.msgs, res.data.users, userid));
                }
            })
    }
}