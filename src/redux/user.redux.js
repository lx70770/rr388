import axios from 'axios';

import {redirectToFun} from '../util';

const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOG_OUT = 'LOG_OUT';
const ERROR_MSG = 'ERROR_MSG';
const LOADING_DATD = 'LOADING-DATA';

const initState = {
    redirectToFun: '',
    msg: '',
    user: '',
    type: ''
};

//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: action.msg,
                redirectToFun: redirectToFun(action.payload.type, action.payload.avatar),
                ...action.payload
            };
        case LOADING_DATD:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {...state, isAuth: false ,msg: action.msg};
        case LOG_OUT:
            return {...initState, redirectToFun: '/login'};
        default:
            return state;
    }
}

function authSuccess(data) {
    return {type: AUTH_SUCCESS, payload: data}
}

export function loadingData(userinfo) {
    return {type: LOADING_DATD, payload: userinfo};
}

function errorMsg(msg) {
    return {type: ERROR_MSG, isAuth: false, msg: msg};
}

export function logoutSubmit() {
    return {type: LOG_OUT};
}

//action
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status === 200 && res.data.data === 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('必须输入用户名和密码');
    }
    return dispatch => {
        axios.post('user/find', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    let type = res.data.data.type;
                    let msg = res.data.msg;
                    dispatch(authSuccess({user, pwd, type, msg}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

export function register({user, pwd, repeatPwd, type}) {
    if (!user || !pwd || !type) {
        return errorMsg('必须输入用户名和密码');
    }
    if (pwd !== repeatPwd) {
        return errorMsg('两次输入密码不一致');
    }
    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    let msg = res.data.msg;
                    dispatch(authSuccess({user, pwd, type, msg}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}
